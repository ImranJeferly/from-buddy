/**
 * Helper function to determine file type based on extension
 * @param {File} file - The file to analyze
 * @returns {string} Type of the file ('image', 'pdf', 'document', or 'unknown')
 */
export const getFileType = (file) => {
  const extension = file.name.split('.').pop().toLowerCase();
  
  // Image types
  if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'].includes(extension)) {
    return 'image';
  }
  
  // PDF
  if (extension === 'pdf') {
    return 'pdf';
  }
  
  // Document types
  if (['doc', 'docx', 'txt', 'rtf', 'odt', 'pages'].includes(extension)) {
    return 'document';
  }
  
  return 'unknown';
};
