/**
 * Handles document file uploads by sending them directly to the analyze API
 * @param {File} file - The document file to handle
 * @param {Function} setFileName - State setter for displaying file name
 * @param {Function} setUploadStatus - State setter for tracking processing status
 * @returns {Promise<void>}
 */
export const handleDocumentFile = async (file, setFileName, setUploadStatus) => {
  if (!file) return;
  
  // Set file name for display
  setFileName(file.name);
  
  // Set upload status to uploading
  setUploadStatus('uploading');
  
  try {
    // Create FormData to send the file
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileType', 'document');
    
    // Send the file directly to the analyze API
    const response = await fetch('/api/analyze', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
      // Pass through special error messages like FILE_TOO_LARGE
      throw new Error(data.error || 'Failed to analyze document');
    }
    
    // Store the explanation data in localStorage for the explanation page
    if (typeof window !== 'undefined') {
      localStorage.setItem('explanationData', JSON.stringify({
        explanation: data.analysis,
        sourceType: 'document',
        sourceName: file.name,
        timestamp: new Date().toISOString()
      }));
    }
    
    // Set success status and redirect
    setUploadStatus('success');
    setTimeout(() => {
      window.location.href = '/explanation';
    }, 1000);
    
  } catch (error) {
    console.error('Document processing error:', error);
    setUploadStatus('error');
    
    // Reset after 3 seconds on error
    setTimeout(() => {
      setFileName(null);
      setUploadStatus(null);
    }, 3000);
  }
};
