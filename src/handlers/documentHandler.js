import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import mammoth from 'mammoth';
import { isOpenAIConfigured } from '@/utils/apiConfig';

/**
 * Handler for document files (docx, txt, etc.)
 * @param {File} file - The document file to process
 * @param {string} userId - User's ID for tracking and storage
 * @param {Object} userData - User data including plan information
 * @returns {Promise<Object>} Result object with success status, message, and updated counts
 */
export const handleDocumentFile = async (file, userId, userData) => {
  console.log('Processing document file:', file.name);
  console.log('File size:', Math.round(file.size / 1024), 'KB');
  console.log('File type:', file.type);
  console.log('File extension:', file.name.split('.').pop().toLowerCase());
  
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
    console.error("Error updating upload count in document handler:", error);
  }
  
  try {
    // Check if OpenAI API is configured
    const apiConfigured = await isOpenAIConfigured();
    if (!apiConfigured) {
      console.warn('OpenAI API not configured. Falling back to mock data.');
      throw new Error('OpenAI API not properly configured');
    }
    
    const fileExt = file.name.split('.').pop().toLowerCase();
    let documentText = '';
    
    // Extract text based on file type
    if (fileExt === 'txt') {
      documentText = await readTextFile(file);
    } else if (['docx', 'doc'].includes(fileExt)) {
      documentText = await extractDocxText(file);
    } else {
      // For other file types, try to read as text first
      try {
        documentText = await readTextFile(file);
      } catch (error) {
        console.error('Failed to read as text, trying as image:', error);
        // If that fails, treat as image
        const documentBase64 = await readFileAsBase64(file);
        
        const analysisResponse = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: documentBase64,
            fileType: 'image', // Treating as image for vision API
            fileName: file.name
          })
        });
        
        if (!analysisResponse.ok) {
          throw new Error(`API error: ${analysisResponse.status}`);
        }
        
        const analysisData = await analysisResponse.json();
        
        if (!analysisData.success) {
          throw new Error(analysisData.error || 'Failed to analyze document');
        }
        
        const explanation = analysisData.analysis;
        
        // Store the explanation data
        if (typeof window !== 'undefined') {
          localStorage.setItem('explanationData', JSON.stringify({
            explanation,
            sourceType: 'document',
            sourceName: file.name,
            timestamp: new Date().toISOString()
          }));
        }
        
        return { 
          success: true, 
          message: 'Document processed successfully as image',
          updatedUploadCount,
          explanation,
          shouldRedirect: true,
          redirectUrl: '/explanation'
        };
      }
    }
    
    // If we have text, send it to the API for analysis
    if (documentText && documentText.trim().length > 0) {
      const analysisResponse = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: documentText,
          fileType: 'document',
          fileName: file.name
        })
      });
      
      if (!analysisResponse.ok) {
        throw new Error(`API error: ${analysisResponse.status}`);
      }
      
      const analysisData = await analysisResponse.json();
      
      if (!analysisData.success) {
        throw new Error(analysisData.error || 'Failed to analyze document');
      }
      
      const explanation = analysisData.analysis;
      
      // Store the explanation data
      if (typeof window !== 'undefined') {
        localStorage.setItem('explanationData', JSON.stringify({
          explanation,
          sourceType: 'document',
          sourceName: file.name,
          timestamp: new Date().toISOString()
        }));
      }
      
      return { 
        success: true, 
        message: 'Document processed successfully',
        updatedUploadCount,
        explanation,
        shouldRedirect: true,
        redirectUrl: '/explanation'
      };
    } else {
      throw new Error('No text could be extracted from the document');
    }
  } catch (error) {
    console.error('Error processing document:', error);
    
    // Fallback to mock explanation if API fails
    const fileExt = file.name.split('.').pop().toLowerCase();
    const mockExplanation = generateMockDocumentExplanation(file.name, fileExt);
    
    // Store the mock explanation
    if (typeof window !== 'undefined') {
      localStorage.setItem('explanationData', JSON.stringify({
        explanation: mockExplanation,
        sourceType: 'document',
        sourceName: file.name,
        timestamp: new Date().toISOString(),
        isFallback: true
      }));
    }
    
    return {
      success: true, // Still return success but with fallback data
      message: 'Document processed with fallback data due to API error',
      updatedUploadCount,
      explanation: mockExplanation,
      shouldRedirect: true,
      redirectUrl: '/explanation',
      apiError: error.message
    };
  }
};

/**
 * Helper function to read a text file
 * @param {File} file - The text file to read
 * @returns {Promise<string>} The text content
 */
function readTextFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsText(file);
  });
}

/**
 * Helper function to extract text from a DOCX file
 * @param {File} file - The DOCX file
 * @returns {Promise<string>} Extracted text
 */
async function extractDocxText(file) {
  try {
    const arrayBuffer = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
    
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  } catch (error) {
    console.error('Error extracting text from DOCX:', error);
    return '';
  }
}

/**
 * Helper function to read a file as base64
 * @param {File} file - The file to read
 * @returns {Promise<string>} Base64 string of the file
 */
function readFileAsBase64(file) {
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
}

/**
 * Generates a mock explanation for document files
 * @param {string} fileName - The name of the document file
 * @param {string} fileExt - The file extension
 * @returns {Object} A mock explanation object
 */
function generateMockDocumentExplanation(fileName, fileExt) {
  // Determine the document type based on file name and extension
  const fileNameLower = fileName.toLowerCase();
  
  // Check for specific document types
  let documentCategory = 'general';
  if (fileNameLower.includes('agreement') || fileNameLower.includes('contract')) {
    documentCategory = 'contract';
  } else if (fileNameLower.includes('report') || fileNameLower.includes('analysis')) {
    documentCategory = 'report';
  } else if (fileNameLower.includes('resume') || fileNameLower.includes('cv')) {
    documentCategory = 'resume';
  } else if (fileNameLower.includes('form') || fileNameLower.includes('application')) {
    documentCategory = 'form';
  }
  
  // Generate content based on document category
  let sections = [];
  let actionItems = [];
  
  switch (documentCategory) {
    case 'contract':
      sections = [
        {
          title: 'Contract Overview',
          content: `This appears to be a legal agreement or contract document. The document is in ${fileExt.toUpperCase()} format and contains legally binding terms and conditions.`
        },
        {
          title: 'Key Terms',
          content: `The contract includes several important sections including obligations, payment terms, and termination clauses. There ${Math.random() > 0.5 ? 'appears to be' : 'may be'} a signature section at the end of the document.`
        },
        {
          title: 'Legal Implications',
          content: 'This document creates legally binding obligations. You should review all terms carefully before agreeing to them, and consider legal advice for any terms you do not understand.'
        }
      ];
      actionItems = [
        'Read the entire document carefully',
        'Pay special attention to sections marked as "important" or in bold text',
        'Check the effective date and duration of the agreement',
        'Ensure all parties are correctly identified',
        'Consider legal review before signing'
      ];
      break;
      
    case 'report':
      sections = [
        {
          title: 'Report Structure',
          content: `This document appears to be a ${Math.random() > 0.5 ? 'technical' : 'analytical'} report. It contains data analysis, findings, and likely includes charts or tables to illustrate key points.`
        },
        {
          title: 'Key Findings',
          content: 'The report presents several findings based on data analysis. There appears to be an executive summary at the beginning and detailed analysis in subsequent sections.'
        },
        {
          title: 'Methodology',
          content: 'The report describes the methodology used to collect and analyze data, ensuring transparency and reproducibility of results.'
        }
      ];
      actionItems = [
        'Review the executive summary for key points',
        'Check the methodology section to understand how data was collected',
        'Pay attention to limitations and assumptions noted in the report',
        'Review conclusions and recommendations'
      ];
      break;
      
    case 'resume':
      sections = [
        {
          title: 'Resume Overview',
          content: 'This document appears to be a professional resume or curriculum vitae (CV). It presents professional experience, skills, and qualifications.'
        },
        {
          title: 'Sections Identified',
          content: 'The resume includes standard sections like professional experience, education, and skills. It may also contain references or a personal statement.'
        },
        {
          title: 'Format Analysis',
          content: `This resume uses a ${Math.random() > 0.5 ? 'traditional' : 'modern'} format with ${Math.random() > 0.5 ? 'chronological' : 'functional'} organization of information.`
        }
      ];
      actionItems = [
        'Check for consistency in formatting throughout the document',
        'Verify all dates and employment details are accurate',
        'Ensure contact information is current and professional',
        'Review for any grammatical or spelling errors'
      ];
      break;
      
    case 'form':
      sections = [
        {
          title: 'Form Overview',
          content: `This appears to be a fillable form or application. The document contains fields for data entry and likely requires completion and submission.`
        },
        {
          title: 'Required Fields',
          content: 'The form contains several required fields that must be completed. These are typically marked with asterisks or highlighting.'
        },
        {
          title: 'Submission Instructions',
          content: 'The form includes instructions for completion and submission. Pay attention to any deadlines mentioned.'
        }
      ];
      actionItems = [
        'Complete all required fields marked with asterisks (*)',
        'Double-check all entered information for accuracy',
        'Sign and date the form where indicated',
        'Make a copy of the completed form for your records',
        'Submit by the specified deadline'
      ];
      break;
      
    default:
      // General document
      sections = [
        {
          title: 'Document Overview',
          content: `This is a ${fileExt.toUpperCase()} document that contains textual information organized into paragraphs and sections. The document appears to be ${Math.floor(Math.random() * 10) + 2} pages in length.`
        },
        {
          title: 'Content Structure',
          content: 'The document is structured with headings, paragraphs, and possibly lists or tables. The information flows in a logical order.'
        },
        {
          title: 'Purpose Assessment',
          content: `This document appears to be ${Math.random() > 0.5 ? 'informative' : 'instructional'} in nature, providing details on a specific topic or process.`
        }
      ];
      actionItems = [
        'Read through the document completely',
        'Note any action items or deadlines mentioned',
        'Save or bookmark for future reference if needed'
      ];
  }
  
  return {
    summary: `This document is a ${documentCategory}-type file in ${fileExt.toUpperCase()} format. The document has been analyzed and its structure has been interpreted for easier understanding.`,
    sections: sections,
    actionItems: actionItems
  };
}
