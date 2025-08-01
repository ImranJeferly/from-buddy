import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';

/**
 * Handles image file uploads by converting them to base64 and sending to the analyze API
 * @param {File} file - The image file to handle
 * @param {Function} setFileName - State setter for displaying file name
 * @param {Function} setUploadStatus - State setter for tracking processing status
 * @param {Function} [setOverlayMessage] - Optional state setter for detailed status messages
 * @param {Function} [setShowOverlay] - Optional state setter to control overlay visibility
 * @param {Object} [userData] - User data containing plan information
 * @param {string} [userId] - User ID for database updates
 * @param {string} [selectedLanguage] - Selected language for Pro users
 * @returns {Promise<void>}
 */
export const handleImageFile = async (file, setFileName, setUploadStatus, setOverlayMessage, setShowOverlay, userData = null, userId = null, selectedLanguage = 'en') => {
  if (!file) return;
  
  // Set file name for display
  setFileName(file.name);
  
  // Set upload status to uploading
  setUploadStatus('uploading');
  
  // Helper function to update status with detailed messages
  const updateStatus = (status, message) => {
    // Always update both status and message together for consistency
    setUploadStatus(status);
    
    // Ensure overlay message is updated and stays visible
    if (setOverlayMessage) {
      setOverlayMessage(message);
      console.log(`Status update: ${status} - ${message}`); // Log for debugging
    }
    
    // Always keep overlay visible during the entire process
    if (setShowOverlay) {
      setShowOverlay(true);
    }
  };
  
  try {
    // Step 1: Converting image to base64
    updateStatus('processing', 'Converting image...');
    const base64Image = await convertImageToBase64(file);
    
    // Step 2: Sending to API
    updateStatus('processing', 'Sending to AI for analysis, this may take few minutes...');
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: base64Image,
        fileType: 'image',
        fileName: file.name,
        userPlan: userData?.planType || 'free',
        userId: userId,
        selectedLanguage: selectedLanguage
      }),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    // Step 3: Receiving and parsing response
    updateStatus('processing', 'Receiving AI analysis...');
    const data = await response.json();
    
    if (!data.success) {
      // Pass through special error messages like FILE_TOO_LARGE
      throw new Error(data.error || 'Failed to analyze image');
    }
    
    // Get the number of fields detected
    const fieldsCount = data.analysis?.fields?.length || 0;
    
    // Step 4: Processing results
    if (fieldsCount > 0) {
      updateStatus('processing', `Detected ${fieldsCount} form fields! Enhancing explanations...`);
    } else {
      updateStatus('processing', 'Processing results...');
    }
    
    // Step 5: Increment upload count for successful processing
    if (userId) {
      try {
        updateStatus('processing', 'Updating your usage count...');
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
          uploadCount: increment(1)
        });
        console.log('Successfully incremented upload count for user:', userId);
      } catch (countError) {
        console.error('Error incrementing upload count:', countError);
        // Don't fail the entire process if count update fails
      }
    }

    // Step 6: Storing data
    updateStatus('processing', 'Preparing your results...');
    if (typeof window !== 'undefined') {
      localStorage.setItem('explanationData', JSON.stringify({
        explanation: data.analysis,
        sourceType: 'image',
        sourceName: file.name,
        timestamp: new Date().toISOString()
      }));
    }
    
    // Step 7: Success and redirect
    updateStatus('success', `Success! Found ${fieldsCount} form fields. Redirecting to explanation...`);
    
    // Keep overlay visible and show success status for 1.5 seconds before redirecting
    setTimeout(() => {
      if (setShowOverlay) {
        // Explicitly ensure overlay stays visible until redirect
        setShowOverlay(true);
      }
      window.location.href = '/explanation';
    }, 1500);
    
  } catch (error) {
    console.error('Image processing error:', error);
    setUploadStatus('error');
    
    if (setOverlayMessage) {
      setOverlayMessage(error.message || 'Failed to analyze image');
    }
    
    // Reset after 3 seconds on error, but keep overlay visible
    setTimeout(() => {
      setFileName(null);
      setUploadStatus(null);
      // We keep the overlay visible as it's showing the error message
    }, 3000);
  }
};

/**
 * Converts an image file to a base64 data URL
 * @param {File} file - The image file to convert
 * @returns {Promise<string>} - A promise that resolves to the base64 data URL
 */
const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      resolve(reader.result);
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
    
    reader.readAsDataURL(file);
  });
};
