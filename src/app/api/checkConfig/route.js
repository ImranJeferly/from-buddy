import { NextResponse } from 'next/server';
import { OPENAI_MODEL } from '@/utils/apiConfig';

/**
 * Simple API endpoint to check if the OpenAI API key is configured
 * This doesn't actually check if the key is valid, just if it exists and has the right format
 * Also returns the current model being used
 */
export async function GET() {
  const apiKey = process.env.OPENAI_API_KEY;
  
  // Check if the OPENAI_API_KEY environment variable is set and has the right format
  const isConfigured = apiKey && 
                       apiKey.length > 10 && 
                       apiKey.startsWith('sk-');
  
  // Add more detailed message if API key is invalid
  let message = 'OpenAI API appears to be configured';
  if (!apiKey) {
    message = 'OpenAI API key is missing. Set OPENAI_API_KEY in .env.local';
  } else if (apiKey.length <= 10) {
    message = 'OpenAI API key is too short. It should be a full API key from OpenAI';
  } else if (!apiKey.startsWith('sk-')) {
    message = 'OpenAI API key has invalid format. It should start with "sk-"';
  }
  
  return NextResponse.json({
    configured: isConfigured,
    message: message,
    model: OPENAI_MODEL || 'gpt-4o',
    modelCapabilities: {
      text: true,
      vision: true
    }
  });
}
