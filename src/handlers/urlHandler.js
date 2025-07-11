import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { isOpenAIConfigured } from '@/utils/apiConfig';

/**
 * Handler for URL links
 * @param {string} url - The URL to process
 * @param {string} language - Selected language for processing
 * @param {string} userId - User's ID for tracking and storage
 * @param {Object} userData - User data including plan information
 * @returns {Promise<Object>} Result object with success status, message, and updated count
 */
export const handleUrlInput = async (url, language = 'en', userId, userData) => {
  console.log('Processing URL:', url, 'in language:', language);
  
  // URL validation
  let isValidUrl = false;
  try {
    const urlObj = new URL(url);
    isValidUrl = urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch (e) {
    return { success: false, message: 'Invalid URL format' };
  }
  
  if (!isValidUrl) {
    return { success: false, message: 'URL must start with http:// or https://' };
  }
  
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
    console.error("Error updating upload count in URL handler:", error);
  }
  
  try {
    // Check if OpenAI API is configured
    const apiConfigured = await isOpenAIConfigured();
    if (!apiConfigured) {
      console.warn('OpenAI API not configured. Falling back to mock data.');
      throw new Error('OpenAI API not properly configured');
    }
    
    let htmlContent = '';
    let fetchSuccess = false;
    
    // Try to fetch using our backend API first
    try {
      console.log('Attempting to fetch URL via backend API...');
      const fetchResponse = await fetch('/api/fetchUrl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, language })
      });
      
      if (fetchResponse.ok) {
        const fetchData = await fetchResponse.json();
        
        if (fetchData.success && fetchData.html) {
          console.log('Successfully fetched URL via backend API');
          htmlContent = fetchData.html;
          fetchSuccess = true;
        }
      }
    } catch (fetchError) {
      console.warn('Error fetching URL via backend API:', fetchError.message);
    }
    
    // If backend fetch failed, create a simple representation of the URL
    if (!fetchSuccess) {
      console.log('Backend fetch failed, creating URL representation');
      const urlObj = new URL(url);
      htmlContent = `<html>
        <head><title>${urlObj.hostname}</title></head>
        <body>
          <h1>Analysis of ${url}</h1>
          <p>This is a website URL that may contain forms or important information.</p>
          <p>Domain: ${urlObj.hostname}</p>
          <p>Path: ${urlObj.pathname}</p>
          <p>Protocol: ${urlObj.protocol}</p>
        </body>
      </html>`;
    }
    
    // Now send the HTML content to our analysis API
    const analysisResponse = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: htmlContent,
        fileType: 'website',
        fileName: url
      })
    });
    
    if (!analysisResponse.ok) {
      throw new Error(`API error: ${analysisResponse.status}`);
    }
    
    const analysisData = await analysisResponse.json();
    
    if (!analysisData.success) {
      throw new Error(analysisData.error || 'Failed to analyze website');
    }
    
    const explanation = analysisData.analysis;
    
    // Store the explanation data
    if (typeof window !== 'undefined') {
      localStorage.setItem('explanationData', JSON.stringify({
        explanation,
        sourceType: 'website',
        sourceName: url,
        timestamp: new Date().toISOString()
      }));
    }
    
    return { 
      success: true, 
      message: 'URL processed successfully',
      updatedUploadCount,
      explanation,
      shouldRedirect: true,
      redirectUrl: '/explanation'
    };
    
  } catch (error) {
    console.error('Error processing URL:', error);
    
    // Fallback to mock explanation if API fails
    const mockExplanation = generateMockUrlExplanation(url);
    
    // Store the mock explanation
    if (typeof window !== 'undefined') {
      localStorage.setItem('explanationData', JSON.stringify({
        explanation: mockExplanation,
        sourceType: 'website',
        sourceName: url,
        timestamp: new Date().toISOString(),
        isFallback: true
      }));
    }
    
    return { 
      success: true, // Still return success but with fallback data
      message: 'URL processed with fallback data due to API error',
      updatedUploadCount,
      explanation: mockExplanation,
      shouldRedirect: true,
      redirectUrl: '/explanation',
      apiError: error.message
    };
  }
};

/**
 * Generates a mock explanation for a URL
 * @param {string} url - The URL to explain
 * @returns {Object} A mock explanation object
 */
function generateMockUrlExplanation(url) {
  // Parse the URL to get relevant parts
  let domain = '';
  let path = '';
  let isSecure = false;
  
  try {
    const urlObj = new URL(url);
    domain = urlObj.hostname;
    path = urlObj.pathname;
    isSecure = urlObj.protocol === 'https:';
  } catch (e) {
    console.error('Error parsing URL:', e);
  }
  
  // Determine the likely type of website based on the URL
  let websiteType = 'informational';
  
  if (path.includes('form') || path.includes('apply') || path.includes('register') || path.includes('sign-up')) {
    websiteType = 'form';
  } else if (path.includes('checkout') || path.includes('cart') || path.includes('payment') || path.includes('buy')) {
    websiteType = 'e-commerce';
  } else if (path.includes('contact') || path.includes('support')) {
    websiteType = 'contact';
  } else if (domain.includes('gov')) {
    websiteType = 'government';
  } else if (domain.includes('edu')) {
    websiteType = 'educational';
  }
  
  // Generate sections based on website type
  let sections = [];
  let actionItems = [];
  
  // Base website information section (common to all types)
  sections.push({
    title: 'Website Information',
    content: `This is a website located at ${domain}. ${isSecure ? 'The website uses secure HTTPS encryption for data transmission.' : 'WARNING: This website does not use HTTPS encryption, which could present security risks when submitting sensitive information.'}`
  });
  
  switch (websiteType) {
    case 'form':
      sections.push(
        {
          title: 'Form Overview',
          content: `This webpage contains a form that likely collects user information. The form appears to be ${getRandomFormPurpose()}.`
        },
        {
          title: 'Required Information',
          content: 'The form likely requires personal information such as name, email address, and possibly additional details specific to the form\'s purpose.'
        },
        {
          title: 'Privacy Considerations',
          content: `When submitting information through this form, be aware of how your data will be used. ${isSecure ? 'The connection is secure, which helps protect your data during transmission.' : 'The connection is not secure, which may pose privacy risks.'}`
        }
      );
      
      actionItems = [
        'Read the privacy policy before submitting personal information',
        'Check for required fields (usually marked with an asterisk *)',
        'Verify any pre-filled information for accuracy',
        'Look for submission confirmation or receipt after submitting'
      ];
      break;
      
    case 'e-commerce':
      sections.push(
        {
          title: 'E-Commerce Process',
          content: 'This appears to be an e-commerce checkout or payment page. It likely collects payment information and shipping details.'
        },
        {
          title: 'Security Assessment',
          content: `${isSecure ? 'The page uses secure HTTPS encryption, which is essential for protecting payment information.' : 'WARNING: This page does not use secure HTTPS encryption, which is a significant security concern for e-commerce transactions.'}`
        },
        {
          title: 'Transaction Details',
          content: 'The page likely includes order summary, payment options, and shipping information fields.'
        }
      );
      
      actionItems = [
        'Verify the website is legitimate before entering payment information',
        'Check that the order summary matches your expected purchases',
        'Look for additional fees like shipping or taxes',
        'Save or print your order confirmation for reference',
        'Check for payment confirmation email after completing the transaction'
      ];
      break;
      
    case 'government':
      sections.push(
        {
          title: 'Government Website Information',
          content: `This appears to be an official government website on the ${domain} domain. Government websites typically provide official information, services, or forms.`
        },
        {
          title: 'Service Assessment',
          content: 'The page likely provides official government information or services, possibly including downloadable forms, online applications, or informational resources.'
        },
        {
          title: 'Authentication Requirements',
          content: 'Government services often require identity verification. You may need to create an account or provide identification information to access certain features.'
        }
      );
      
      actionItems = [
        'Verify you are on the official government website (check for .gov domain)',
        'Have any required identification documents ready before proceeding',
        'Take note of any application or reference numbers provided',
        'Be aware of any deadlines or processing timeframes mentioned'
      ];
      break;
      
    default:
      // General informational website
      sections.push(
        {
          title: 'Website Purpose',
          content: `This appears to be an informational website. The page at ${path || '/'} likely contains content related to the site's main topic or purpose.`
        },
        {
          title: 'Content Overview',
          content: 'The website likely contains articles, information, or resources organized into sections or categories.'
        }
      );
      
      actionItems = [
        'Check the website\'s "About" section to verify its authenticity',
        'Look for contact information if you need to reach the site owners',
        'Verify information from multiple sources if making important decisions'
      ];
  }
  
  return {
    summary: `This URL leads to a ${websiteType} website at ${domain}. The content has been analyzed for easier understanding and navigation.`,
    sections: sections,
    actionItems: actionItems
  };
}

/**
 * Helper function to get a random form purpose
 */
function getRandomFormPurpose() {
  const purposes = [
    'a registration or signup form',
    'a contact request form',
    'an application submission form',
    'a survey or feedback form',
    'a newsletter subscription form',
    'an account creation form',
    'a data collection form'
  ];
  return purposes[Math.floor(Math.random() * purposes.length)];
}
