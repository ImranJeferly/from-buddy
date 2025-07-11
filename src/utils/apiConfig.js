/**
 * Utility to check if required API keys are available
 * This helps catch issues early rather than getting API errors
 */

// Keep track of whether warnings have already been shown
let warningShown = false;

/**
 * Checks if the OpenAI API is likely to be configured
 * This is a client-side check that just verifies if we've set up the necessary environment
 * @returns {boolean} Whether the API appears to be properly configured
 */
export const isOpenAIConfigured = async () => {
  try {
    // Make a minimal call to check if the API key is configured
    const response = await fetch('/api/checkConfig');
    const data = await response.json();
    
    return data.configured;
  } catch (error) {
    console.error('Error checking API configuration:', error);
    
    // Only show the warning once to avoid spamming the console
    if (!warningShown) {
      console.warn('OpenAI API may not be properly configured. Set up your .env.local file with OPENAI_API_KEY.');
      warningShown = true;
    }
    
    return false;
  }
};
