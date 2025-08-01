"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  GoogleAuthProvider, 
  signInWithPopup,
  FacebookAuthProvider, 
  signOut,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { generateTTSGreeting } from './ttsHelper';
import { trackUserRegistrationIP } from './ipRestrictions';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register with email/password
  const signup = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user document in Firestore with consistent structure
      const userDoc = {
        name,
        email,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        planType: 'free', // default plan
        planStartDate: serverTimestamp(),
        planExpiryDate: null, // null for free plan
        planStatus: 'active',
        uploadCount: 0,
        uploadQuota: 3, // free plan lifetime limit
        totalStorage: 0, // in bytes
        storageQuota: 10 * 1024 * 1024, // 10MB for free plan
        authProvider: 'email',
        lastUpdated: serverTimestamp(),
        isFirstVisit: true, // Flag to track if this is the first visit after registration
      };

      await setDoc(doc(db, "users", userCredential.user.uid), userDoc);
      
      // Track registration IP - Try API first, then fallback to direct approach
      try {
        await trackUserRegistrationIP(userCredential.user.uid);
        console.log('Registration IP tracked successfully via API');
      } catch (ipError) {
        console.error('Failed to track registration IP via API:', ipError);
        
        // Fallback: Try to get IP from browser and save directly
        try {
          // This is a simple fallback - in production you might want to use a different IP service
          const response = await fetch('https://api.ipify.org?format=json').catch(() => null);
          let fallbackIP = '127.0.0.1';
          
          if (response && response.ok) {
            const data = await response.json();
            fallbackIP = data.ip || '127.0.0.1';
          }
          
          // Save IP directly to user document
          await setDoc(doc(db, "users", userCredential.user.uid), {
            registrationIP: fallbackIP,
            ipTrackingMethod: 'fallback',
            lastUpdated: serverTimestamp()
          }, { merge: true });
          
          console.log('Registration IP saved via fallback method:', fallbackIP);
        } catch (fallbackError) {
          console.error('Fallback IP tracking also failed:', fallbackError);
          // Even fallback failed, but don't prevent registration
        }
      }
      
      // Generate TTS greeting for new user
      try {
        const ttsResult = await generateTTSGreeting(name, userCredential.user.uid);
        
        // Update user document with TTS greeting link
        await setDoc(doc(db, "users", userCredential.user.uid), {
          greetingAudioUrl: ttsResult.audioUrl,
          greetingAudioFilename: ttsResult.filename,
          greetingGeneratedAt: serverTimestamp(),
          lastUpdated: serverTimestamp()
        }, { merge: true });
        
        console.log('TTS greeting generated successfully for new user');
      } catch (ttsError) {
        console.error('Failed to generate TTS greeting for new user:', ttsError);
        // Don't throw error here - TTS failure shouldn't prevent user registration
      }
      
      return userCredential.user;
    } catch (error) {
      console.error("Error in signup:", error);
      throw error;
    }
  };

  // Login with email/password
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Check if user document exists
      const userRef = doc(db, "users", userCredential.user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        // Create new user document if it doesn't exist with complete structure
        await setDoc(userRef, {
          name: userCredential.user.displayName || email.split('@')[0], // Use part before @ in email as name if displayName is null
          email: userCredential.user.email,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
          planType: 'free', // default plan
          planStartDate: serverTimestamp(),
          planExpiryDate: null, // null for free plan
          planStatus: 'active',
          uploadCount: 0,
          uploadQuota: 3, // free plan lifetime limit
          totalStorage: 0, // in bytes
          storageQuota: 10 * 1024 * 1024, // 10MB for free plan
          authProvider: 'email',
          lastUpdated: serverTimestamp()
        });
      } else {
        // Just update last login time if user document exists
        // Do not modify the isFirstVisit flag as it should persist until the first upload page visit
        await setDoc(userRef, {
          lastLogin: serverTimestamp(),
          lastUpdated: serverTimestamp()
        }, { merge: true });
      }
      
      return userCredential.user;
    } catch (error) {
      console.error("Error in login:", error);
      throw error;
    }
  };

  // Google sign in
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      
      // Check if user document exists
      const userRef = doc(db, "users", userCredential.user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        // Create new user document with complete structure
        const userName = userCredential.user.displayName || 'Google User';
        const userDoc = {
          name: userName,
          email: userCredential.user.email,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
          planType: 'free', // default plan
          planStartDate: serverTimestamp(),
          planExpiryDate: null, // null for free plan
          planStatus: 'active',
          uploadCount: 0,
          uploadQuota: 3, // free plan lifetime limit
          totalStorage: 0, // in bytes
          storageQuota: 10 * 1024 * 1024, // 10MB for free plan
          authProvider: 'google',
          lastUpdated: serverTimestamp(),
          isFirstVisit: true, // Flag to track if this is the first visit after registration
        };

        await setDoc(userRef, userDoc);
        
        // Track registration IP for new Google users
        try {
          await trackUserRegistrationIP(userCredential.user.uid);
          console.log('Registration IP tracked successfully for Google user');
        } catch (ipError) {
          console.error('Failed to track registration IP for Google user:', ipError);
          
          // Fallback for Google users too
          try {
            const response = await fetch('https://api.ipify.org?format=json').catch(() => null);
            let fallbackIP = '127.0.0.1';
            
            if (response && response.ok) {
              const data = await response.json();
              fallbackIP = data.ip || '127.0.0.1';
            }
            
            await setDoc(userRef, {
              registrationIP: fallbackIP,
              ipTrackingMethod: 'fallback',
              lastUpdated: serverTimestamp()
            }, { merge: true });
            
            console.log('Google user IP saved via fallback method:', fallbackIP);
          } catch (fallbackError) {
            console.error('Fallback IP tracking failed for Google user:', fallbackError);
          }
        }
        
        // Generate TTS greeting for new user
        try {
          const ttsResult = await generateTTSGreeting(userName, userCredential.user.uid);
          
          // Update user document with TTS greeting link
          await setDoc(userRef, {
            greetingAudioUrl: ttsResult.audioUrl,
            greetingAudioFilename: ttsResult.filename,
            greetingGeneratedAt: serverTimestamp(),
            lastUpdated: serverTimestamp()
          }, { merge: true });
          
          console.log('TTS greeting generated successfully for new Google user');
        } catch (ttsError) {
          console.error('Failed to generate TTS greeting for new Google user:', ttsError);
          // Don't throw error here - TTS failure shouldn't prevent user registration
        }
      } else {
        // Update last login
        // Do not modify the isFirstVisit flag as it should persist until the first upload page visit
        await setDoc(userRef, {
          lastLogin: serverTimestamp(),
          lastUpdated: serverTimestamp()
        }, { merge: true });
      }
      
      return userCredential.user;
    } catch (error) {
      console.error("Error in Google sign in:", error);
      throw error;
    }
  };

  // Facebook sign in
  const signInWithFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider();
      // Request email permission explicitly
      provider.addScope('email');
      const userCredential = await signInWithPopup(auth, provider);
      
      // Get email - Facebook sometimes doesn't provide email in the basic profile
      const email = userCredential.user.email || 
                   (userCredential.additionalUserInfo?.profile?.email) ||
                   `facebook_user_${userCredential.user.uid}@placeholder.com`;
      
      // Check if user document exists
      const userRef = doc(db, "users", userCredential.user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        // Create new user document with complete structure
        const userName = userCredential.user.displayName || 'Facebook User';
        const userDoc = {
          name: userName,
          email: email,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
          planType: 'free', // default plan
          planStartDate: serverTimestamp(),
          planExpiryDate: null, // null for free plan
          planStatus: 'active',
          uploadCount: 0,
          uploadQuota: 3, // free plan lifetime limit
          totalStorage: 0, // in bytes
          storageQuota: 10 * 1024 * 1024, // 10MB for free plan
          authProvider: 'facebook',
          lastUpdated: serverTimestamp()
        };

        await setDoc(userRef, userDoc);
        
        // Generate TTS greeting for new user
        try {
          const ttsResult = await generateTTSGreeting(userName, userCredential.user.uid);
          
          // Update user document with TTS greeting link
          await setDoc(userRef, {
            greetingAudioUrl: ttsResult.audioUrl,
            greetingAudioFilename: ttsResult.filename,
            greetingGeneratedAt: serverTimestamp(),
            lastUpdated: serverTimestamp()
          }, { merge: true });
          
          console.log('TTS greeting generated successfully for new Facebook user');
        } catch (ttsError) {
          console.error('Failed to generate TTS greeting for new Facebook user:', ttsError);
          // Don't throw error here - TTS failure shouldn't prevent user registration
        }
      } else {
        // Update last login
        await setDoc(userRef, {
          lastLogin: serverTimestamp(),
          lastUpdated: serverTimestamp()
        }, { merge: true });
      }
      
      return userCredential.user;
    } catch (error) {
      console.error("Error in Facebook sign in:", error);
      throw error;
    }
  };

  // Logout
  const logout = () => {
    return signOut(auth);
  };

  // Password reset
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Update user profile
  const updateUserProfile = async (profileData) => {
    try {
      if (!currentUser) throw new Error('No user logged in');
      
      // Update Firebase Auth profile
      await updateProfile(currentUser, {
        displayName: profileData.displayName
      });
      
      // Update Firestore user document
      const userRef = doc(db, "users", currentUser.uid);
      await setDoc(userRef, {
        name: profileData.displayName,
        lastUpdated: serverTimestamp()
      }, { merge: true });
      
      // Refresh user data
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserData(userSnap.data());
      }
      
      return true;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // If we have a user, check for Firestore document
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) {
          // Create user document if it doesn't exist
          
          // Try to determine auth provider from providerData
          const authProvider = user.providerData && user.providerData[0]
            ? user.providerData[0].providerId.replace('.com', '')  // Strip .com from auth providers like 'google.com'
            : 'email';
          
          const userName = user.displayName || user.email.split('@')[0];
          const userDoc = {
            name: userName,
            email: user.email,
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp(),
            planType: 'free', // default plan
            planStartDate: serverTimestamp(),
            planExpiryDate: null, // null for free plan
            planStatus: 'active',
            uploadCount: 0,
            uploadQuota: 3, // free plan lifetime limit
            totalStorage: 0, // in bytes
            storageQuota: 10 * 1024 * 1024, // 10MB for free plan
            authProvider: authProvider,
            lastUpdated: serverTimestamp()
          };

          await setDoc(userRef, userDoc);
          
          // Track registration IP for new users detected in auth state change
          try {
            await trackUserRegistrationIP(user.uid);
            console.log('Registration IP tracked successfully for user (auth state change)');
          } catch (ipError) {
            console.error('Failed to track registration IP for user (auth state change):', ipError);
            
            // Fallback for auth state change users
            try {
              const response = await fetch('https://api.ipify.org?format=json').catch(() => null);
              let fallbackIP = '127.0.0.1';
              
              if (response && response.ok) {
                const data = await response.json();
                fallbackIP = data.ip || '127.0.0.1';
              }
              
              await setDoc(userRef, {
                registrationIP: fallbackIP,
                ipTrackingMethod: 'fallback',
                lastUpdated: serverTimestamp()
              }, { merge: true });
              
              console.log('Auth state change user IP saved via fallback method:', fallbackIP);
            } catch (fallbackError) {
              console.error('Fallback IP tracking failed for auth state change user:', fallbackError);
            }
          }
          
          // Generate TTS greeting for new user
          try {
            const ttsResult = await generateTTSGreeting(userName, user.uid);
            
            // Update user document with TTS greeting link
            await setDoc(userRef, {
              greetingAudioUrl: ttsResult.audioUrl,
              greetingAudioFilename: ttsResult.filename,
              greetingGeneratedAt: serverTimestamp(),
              lastUpdated: serverTimestamp()
            }, { merge: true });
            
            console.log('TTS greeting generated successfully for new user (auth state change)');
          } catch (ttsError) {
            console.error('Failed to generate TTS greeting for new user (auth state change):', ttsError);
            // Don't throw error here - TTS failure shouldn't prevent user registration
          }
        } else {
          // Optionally update last login on auth state change
          await setDoc(userRef, {
            lastLogin: serverTimestamp(),
            lastUpdated: serverTimestamp()
          }, { merge: true });
        }
        
        // Fetch user data from Firestore
        const updatedUserSnap = await getDoc(userRef);
        if (updatedUserSnap.exists()) {
          setUserData(updatedUserSnap.data());
        }
      } else {
        setUserData(null);
      }
      
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    signup,
    login,
    signInWithGoogle,
    signInWithFacebook,
    logout,
    resetPassword,
    updateUserProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
