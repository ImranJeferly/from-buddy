import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Check if a user's IP has restrictions for free tier usage
 * @param {string} userId - The user's Firebase UID
 * @returns {Promise<{restricted: boolean, reason?: string, userCount?: number}>}
 */
export async function checkIPRestrictions(userId) {
  try {
    // Get user data first
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      return { restricted: false, reason: 'User not found' };
    }
    
    const userData = userDoc.data();
    
    // Pro users have no restrictions
    if (userData.planType === 'pro') {
      return { restricted: false, reason: 'Pro user - no restrictions' };
    }
    
    // If no registration IP recorded, no restrictions (legacy users)
    if (!userData.registrationIP) {
      return { restricted: false, reason: 'No IP tracking data' };
    }
    
    const userIP = userData.registrationIP;
    
    // Get all users from the same IP
    const usersQuery = query(
      collection(db, 'users'),
      where('registrationIP', '==', userIP)
    );
    const usersSnapshot = await getDocs(usersQuery);
    
    let freeBasicUsers = [];
    let hasProUser = false;
    
    usersSnapshot.forEach((doc) => {
      const user = doc.data();
      const userId = doc.id;
      
      if (user.planType === 'pro') {
        hasProUser = true;
      } else {
        freeBasicUsers.push({ id: userId, ...user });
      }
    });
    
    // If there are more than 2 free/basic users from same IP and no pro user
    if (freeBasicUsers.length > 2 && !hasProUser) {
      return {
        restricted: true,
        reason: 'Maximum free accounts exceeded for this IP address',
        userCount: freeBasicUsers.length,
        restrictionType: 'ip_overuse',
        affectedUsers: freeBasicUsers.map(u => u.id)
      };
    }
    
    return { 
      restricted: false, 
      userCount: freeBasicUsers.length + (hasProUser ? 1 : 0)
    };
    
  } catch (error) {
    console.error('Error checking IP restrictions:', error);
    // In case of error, don't restrict (fail open)
    return { restricted: false, reason: 'Error checking restrictions' };
  }
}

/**
 * Get upload quota for a user considering IP restrictions
 * @param {Object} userData - User data from Firestore
 * @param {string} userId - User's Firebase UID
 * @returns {Promise<{quota: number, restricted: boolean, reason?: string}>}
 */
export async function getEffectiveUploadQuota(userData, userId) {
  try {
    // Pro users always get unlimited
    if (userData.planType === 'pro') {
      return { quota: Infinity, restricted: false };
    }
    
    // Check IP restrictions
    const ipCheck = await checkIPRestrictions(userId);
    
    if (ipCheck.restricted) {
      // If IP is restricted, all free accounts from that IP get 0 uploads
      return { 
        quota: 0, 
        restricted: true, 
        reason: ipCheck.reason,
        restrictionType: ipCheck.restrictionType
      };
    }
    
    // Normal quotas based on plan
    const normalQuota = userData.planType === 'basic' ? 15 : 3;
    
    return { 
      quota: normalQuota, 
      restricted: false,
      userCount: ipCheck.userCount
    };
    
  } catch (error) {
    console.error('Error getting effective upload quota:', error);
    // Fallback to normal quota in case of error
    const normalQuota = userData.planType === 'basic' ? 15 : 3;
    return { quota: normalQuota, restricted: false };
  }
}

/**
 * Track user IP during registration
 * @param {string} userId - User's Firebase UID
 * @returns {Promise<boolean>} Success status
 */
export async function trackUserRegistrationIP(userId) {
  try {
    console.log('Attempting to track IP for user:', userId);
    
    const response = await fetch('/api/ip-tracking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        action: 'register'
      }),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      console.error('Failed to track registration IP:', response.status, result);
      throw new Error(result.error || 'Failed to track IP');
    }
    
    console.log('Registration IP tracked successfully:', result);
    return true;
    
  } catch (error) {
    console.error('Error tracking registration IP:', error);
    throw error; // Re-throw to see the actual error in the calling function
  }
}

/**
 * Check if user can upload based on current restrictions
 * @param {string} userId - User's Firebase UID
 * @param {Object} userData - User data from Firestore
 * @returns {Promise<{canUpload: boolean, reason?: string, quota?: number}>}
 */
export async function checkUploadPermission(userId, userData) {
  try {
    const quotaInfo = await getEffectiveUploadQuota(userData, userId);
    
    if (quotaInfo.restricted) {
      return {
        canUpload: false,
        reason: quotaInfo.reason,
        restrictionType: quotaInfo.restrictionType,
        quota: quotaInfo.quota
      };
    }
    
    const currentUploads = userData.uploadCount || 0;
    
    if (quotaInfo.quota === Infinity) {
      return { canUpload: true, quota: quotaInfo.quota };
    }
    
    if (currentUploads >= quotaInfo.quota) {
      return {
        canUpload: false,
        reason: `Upload limit reached (${currentUploads}/${quotaInfo.quota})`,
        quota: quotaInfo.quota
      };
    }
    
    return {
      canUpload: true,
      reason: `${quotaInfo.quota - currentUploads} uploads remaining`,
      quota: quotaInfo.quota,
      remaining: quotaInfo.quota - currentUploads
    };
    
  } catch (error) {
    console.error('Error checking upload permission:', error);
    // Fallback - allow upload but with warning
    return { 
      canUpload: true, 
      reason: 'Unable to verify restrictions - proceeding with caution',
      quota: userData.planType === 'basic' ? 15 : 3
    };
  }
}