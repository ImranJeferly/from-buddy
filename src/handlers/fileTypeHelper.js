/**
 * Helper function to determine file type based on extension
 * @param {File} file - The file to analyze
 * @returns {string} Type of the file ('image' or 'unknown')
 */
export const getFileType = (file) => {
  const extension = file.name.split('.').pop().toLowerCase();
  
  // Only allow image types
  if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension)) {
    return 'image';
  }
  
  // All other file types are unsupported
  return 'unknown';
};
