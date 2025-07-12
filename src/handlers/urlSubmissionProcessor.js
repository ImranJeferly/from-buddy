/**
 * Process a URL submission
 * @param {string} url - The URL to process
 * @param {Function} setFileName - State setter for displaying the URL
 * @param {Function} setUploadStatus - State setter for tracking processing status
 * @param {Function} setUrl - State setter for resetting the URL input field
 * @returns {Promise<void>}
 */
export const processUrlSubmission = async (url, setFileName, setUploadStatus, setUrl) => {
  if (!url.trim()) return;
  
  // Show URL as the "file name"
  setFileName(url);
  
  // Set upload status to uploading
  setUploadStatus('uploading');
  
  try {
    // Basic URL validation
    let isValidUrl = false;
    try {
      const urlObj = new URL(url);
      isValidUrl = urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch (e) {
      throw new Error('Invalid URL format');
    }
    
    if (!isValidUrl) {
      throw new Error('URL must start with http:// or https://');
    }
    
    // Send the URL directly to the analyze API
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: url,
        fileType: 'url'
      })
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to analyze URL');
    }
    
    // Store the explanation data in localStorage for the explanation page
    if (typeof window !== 'undefined') {
      localStorage.setItem('explanationData', JSON.stringify({
        explanation: data.analysis,
        sourceType: 'url',
        sourceName: url,
        timestamp: new Date().toISOString()
      }));
    }
    
    // Set success status and redirect
    setUploadStatus('success');
    setTimeout(() => {
      window.location.href = '/explanation';
    }, 1000);
    
  } catch (error) {
    console.error('URL processing error:', error);
    setUploadStatus('error');
    
    // Reset after 3 seconds on error
    setTimeout(() => {
      setFileName(null);
      setUploadStatus(null);
      setUrl('');
    }, 3000);
  }
};
