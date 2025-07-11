import { getFileType } from "./fileTypeHelper";
import { handleImageFile } from "./imageHandler";
import { handlePdfFile } from "./pdfHandler";
import { handleDocumentFile } from "./documentHandler";

/**
 * Main handler for processing uploaded files
 * @param {File} file - The uploaded file
 * @param {Function} setFileName - State setter for displaying file name
 * @param {Function} setUploadStatus - State setter for tracking upload status
 * @returns {void}
 */
export const processFileUpload = (file, setFileName, setUploadStatus) => {
  // Show file name
  setFileName(file.name);
  
  // Simulate upload progress
  setUploadStatus('uploading');
  
  // Determine file type and process accordingly
  const fileType = getFileType(file);
  let result = { success: false, message: 'Unknown file type' };
  
  switch (fileType) {
    case 'image':
      result = handleImageFile(file);
      break;
    case 'pdf':
      result = handlePdfFile(file);
      break;
    case 'document':
      result = handleDocumentFile(file);
      break;
    default:
      console.warn('Unsupported file type:', file.type);
  }
  
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
    }, 3000);
  }, 2000);
};
