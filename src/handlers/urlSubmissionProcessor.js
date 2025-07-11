import { handleUrlInput } from "./urlHandler";

/**
 * Process a URL submission
 * @param {string} url - The URL to process
 * @param {Function} setFileName - State setter for displaying the URL
 * @param {Function} setUploadStatus - State setter for tracking processing status
 * @param {Function} setUrl - State setter for resetting the URL input field
 * @returns {void}
 */
export const processUrlSubmission = (url, setFileName, setUploadStatus, setUrl) => {
  if (!url.trim()) return;
  
  // Show URL as the "file name"
  setFileName(url);
  
  // Simulate upload progress
  setUploadStatus('uploading');
  
  const result = handleUrlInput(url);
  
  setTimeout(() => {
    if (result.success) {
      setUploadStatus('success');
      console.log(result.message);
    } else {
      setUploadStatus('error');
      console.error(result.message);
    }
    
    // Reset after 3 seconds
    setTimeout(() => {
      setFileName(null);
      setUploadStatus(null);
      setUrl('');
    }, 3000);
  }, 2000);
};
