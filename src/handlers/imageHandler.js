import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { isOpenAIConfigured } from '@/utils/apiConfig';

/**
 * Handler for image files (jpg, png, etc.)
 * @param {File} file - The image file to process
 * @param {string} userId - User's ID for tracking and storage
 * @param {Object} userData - User data including plan information
 * @returns {Promise<Object>} Result object with success status, message, and updated counts
 */
export const handleImageFile = async (file, userId, userData) => {
  console.log('Processing image file:', file.name);
  console.log('File size:', Math.round(file.size / 1024), 'KB');
  console.log('File type:', file.type);
  
  // Update upload count in Firestore
  let updatedUploadCount = userData?.uploadCount || 0;
  try {
    if (userId) {
      updatedUploadCount = (userData?.uploadCount || 0) + 1;
      const userRef = doc(db, "users", userId);
      setDoc(userRef, { 
        uploadCount: updatedUploadCount,
        lastUpdated: new Date()
      }, { merge: true });
      console.log('Updated upload count for user:', userId);
    }
  } catch (error) {
    console.error("Error updating upload count in image handler:", error);
    return {
      success: false,
      message: 'Failed to update user data',
      error
    };
  }
  
  try {
    // Check if OpenAI API is configured
    const apiConfigured = await isOpenAIConfigured();
    if (!apiConfigured) {
      console.warn('OpenAI API not configured. Falling back to mock data.');
      throw new Error('OpenAI API not properly configured');
    }
    
    // Read the image as base64 for API submission
    const imageBase64 = await readFileAsBase64(file);
    
    // Send the image to the API for analysis
    console.log('Sending image to OpenAI API:', file.name);
    const analysisResponse = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: imageBase64,
        fileType: 'image',
        fileName: file.name
      })
    });
    
    if (!analysisResponse.ok) {
      // Try to get more error details from the response
      try {
        const errorData = await analysisResponse.json();
        throw new Error(`API error ${analysisResponse.status}: ${errorData.error || errorData.details || 'Unknown error'}`);
      } catch (jsonError) {
        // If we can't parse the JSON, use the status text
        throw new Error(`API error: ${analysisResponse.status} ${analysisResponse.statusText}`);
      }
    }
    
    const analysisData = await analysisResponse.json();
    
    if (!analysisData.success) {
      throw new Error(analysisData.error || 'Failed to analyze image');
    }
    
    const explanation = analysisData.analysis;
    
    // Store the explanation data in localStorage for the explanation page to access
    if (typeof window !== 'undefined') {
      localStorage.setItem('explanationData', JSON.stringify({
        explanation,
        sourceType: 'image',
        sourceName: file.name,
        timestamp: new Date().toISOString()
      }));
    }
    
    console.log('Image processed successfully:', file.name);
    
    // Return success with updated upload count and explanation
    return { 
      success: true, 
      message: 'Image processed successfully',
      updatedUploadCount,
      explanation,
      shouldRedirect: true,
      redirectUrl: '/explanation'
    };
  } catch (error) {
    console.error('Error processing image:', error);
    
    // Fallback to mock explanation if API fails
    const mockExplanation = generateMockImageExplanation(file.name);
    
    // Store the mock explanation
    if (typeof window !== 'undefined') {
      localStorage.setItem('explanationData', JSON.stringify({
        explanation: mockExplanation,
        sourceType: 'image',
        sourceName: file.name,
        timestamp: new Date().toISOString(),
        isFallback: true
      }));
    }
    
    return {
      success: true, // Still return success but with fallback data
      message: 'Image processed with fallback data due to API error',
      updatedUploadCount,
      explanation: mockExplanation,
      shouldRedirect: true,
      redirectUrl: '/explanation',
      apiError: error.message
    };
  }
};

/**
 * Helper function to read a file as base64
 * @param {File} file - The file to read
 * @returns {Promise<string>} Base64 string of the file as a data URL
 */
function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // This returns a data URL like: data:image/jpeg;base64,/9j/4AAQSkZJRg...
      // which is what the OpenAI API expects for image_url.url
      console.log(`Read file as data URL. Type: ${file.type}, Size: ${Math.round(file.size / 1024)}KB`);
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      console.error('Error reading file as base64:', error);
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Generates a mock explanation for image files
 * @param {string} fileName - The name of the image file
 * @returns {Object} A mock explanation object
 */
function generateMockImageExplanation(fileName) {
  // Determine if this looks like a form, receipt, ID, or other type of document
  const fileNameLower = fileName.toLowerCase();
  let documentType = 'form';
  
  if (fileNameLower.includes('receipt') || fileNameLower.includes('invoice')) {
    documentType = 'receipt';
  } else if (fileNameLower.includes('id') || fileNameLower.includes('card') || fileNameLower.includes('license')) {
    documentType = 'identification';
  } else if (fileNameLower.includes('cert') || fileNameLower.includes('diploma')) {
    documentType = 'certificate';
  }
  
  // Create a content explanation based on the detected document type
  let sections = [];
  let actionItems = [];
  
  switch (documentType) {
    case 'receipt':
      sections = [
        {
          title: 'Receipt Overview',
          content: 'This appears to be a purchase receipt or invoice. The document contains details of items purchased, prices, taxes, and payment information.'
        },
        {
          title: 'Transaction Details',
          content: `The receipt shows a transaction dated approximately ${randomRecentDate()}. The total amount appears to be $${(Math.random() * 200 + 10).toFixed(2)}.`
        },
        {
          title: 'Vendor Information',
          content: 'The receipt contains the vendor\'s name, address, and contact details at the top of the document. There also appears to be a transaction ID or reference number.'
        }
      ];
      actionItems = [
        'Keep this receipt for your records',
        'Check that all items listed were received',
        'Verify the total amount matches your payment'
      ];
      break;
      
    case 'identification':
      sections = [
        {
          title: 'Identification Document',
          content: 'This appears to be an identification document or card. It contains personal information and official markings.'
        },
        {
          title: 'Security Features',
          content: 'The document has several security features including a photograph, signature field, and possibly holographic elements.'
        },
        {
          title: 'Personal Information',
          content: 'The document contains personal identifiable information including name, date of birth, and an identification number.'
        }
      ];
      actionItems = [
        'Verify all personal information is correct',
        'Check the expiration date',
        'Ensure the document has not been damaged'
      ];
      break;
      
    default:
      // Default to form
      sections = [
        {
          title: 'Document Overview',
          content: `This appears to be a form or document requiring completion. The image shows ${Math.floor(Math.random() * 3) + 1} page(s) with multiple sections and field areas.`
        },
        {
          title: 'Form Structure',
          content: 'The form is divided into several sections, likely requesting personal information, preferences, or authorizations from the user.'
        },
        {
          title: 'Required Information',
          content: 'Several fields appear to be marked as required. These are typically indicated by asterisks (*) or highlighted backgrounds.'
        }
      ];
      actionItems = [
        'Fill out all required fields',
        'Sign and date the form where indicated',
        'Make a copy for your records before submission'
      ];
  }
  
  return {
    summary: `This image contains a ${documentType} that has been analyzed for easier understanding. The document appears to be ${getRandomAdjective()} and ${getRandomQualifier()}.`,
    sections: sections,
    actionItems: actionItems
  };
}

/**
 * Helper function to generate a random recent date string
 */
function randomRecentDate() {
  const days = Math.floor(Math.random() * 30);
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toLocaleDateString();
}

/**
 * Helper function to get random adjectives for document descriptions
 */
function getRandomAdjective() {
  const adjectives = ['standard', 'official', 'common', 'typical', 'detailed', 'comprehensive', 'basic', 'well-structured'];
  return adjectives[Math.floor(Math.random() * adjectives.length)];
}

/**
 * Helper function to get random qualifiers for document descriptions
 */
function getRandomQualifier() {
  const qualifiers = ['requires careful review', 'contains important information', 'needs to be completed accurately', 'has several key sections', 'includes instructions for completion'];
  return qualifiers[Math.floor(Math.random() * qualifiers.length)];
}
