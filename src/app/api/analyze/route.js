import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Check if API key is set
if (!process.env.OPENAI_API_KEY) {
  console.error("WARNING: OPENAI_API_KEY is not defined in environment variables!");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * API endpoint to analyze form content using OpenAI
 * @param {Request} request - Contains the file content, type, and name
 * @returns {NextResponse} JSON response with the analysis results
 */
export async function POST(request) {
  try {
    const { content, fileType, fileName, metadata } = await request.json();

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    // Prepare prompt based on file type
    let promptContent = '';
    let modelToUse = 'gpt-4-turbo';

    switch (fileType) {
      case 'image':
        // For images, the content will be a base64 string that we'll use with vision API
        promptContent = `Analyze this image of a form or document. Identify all input fields, labels, sections, and any instructions or important notes. Return a structured JSON response with these elements.`;
        modelToUse = 'gpt-4-vision-preview';
        break;
      case 'pdf':
      case 'document':
        promptContent = `Analyze this ${fileType} content that represents a form or document. Identify all input fields, labels, sections, and any instructions or important notes. Format your response as JSON.`;
        break;
      default:
        promptContent = `Analyze this content that represents a form or document. Identify all input fields, labels, sections, and any instructions or important notes. Format your response as JSON.`;
    }

    // Define system message for consistent output formatting
    const systemMessage = `You are FormBuddy, an expert at analyzing forms and documents to make them easier to understand.
    
Your task is to analyze the provided content and identify:

1. Input fields (with their labels, types, and any validation requirements)
2. Document sections (with titles and descriptions)
3. Important instructions or notes
4. Required actions

Format your response as a JSON object with the following structure:
{
  "summary": "A brief overview of the document",
  "sections": [
    {
      "title": "Section title",
      "content": "Detailed description of this section"
    }
  ],
  "fields": [
    {
      "label": "Field label",
      "type": "text|select|checkbox|radio|date|etc",
      "required": true|false,
      "description": "What this field is asking for",
      "options": ["Option 1", "Option 2"] // Only for select, checkbox, or radio fields
    }
  ],
  "actionItems": [
    "Action item 1",
    "Action item 2"
  ]
}`;

    // Create the API call parameters
    let apiParams = {
      model: modelToUse,
      messages: [
        {
          role: 'system',
          content: systemMessage
        }
      ],
      temperature: 0.5,
      response_format: { type: "json_object" }
    };

    // Add the appropriate content based on file type
    if (fileType === 'image') {
      const message = { 
        role: 'user',
        content: [
          { 
            type: 'text', 
            text: metadata 
              ? `${promptContent}\n\nFile metadata:\n${metadata}`
              : promptContent 
          },
          { 
            type: 'image_url', 
            image_url: {
              // OpenAI accepts data URLs directly, no modification needed
              url: content,
              detail: 'high'
            }
          }
        ]
      };
      
      console.log('Sending image to OpenAI with content type:', typeof content, 'length:', content.length);
      apiParams.messages.push(message);
    } else {
      apiParams.messages.push({
        role: 'user',
        content: `${promptContent}\n\nContent from ${fileName}:\n\n${content}`
      });
    }

    // Make the API call
    const response = await openai.chat.completions.create(apiParams);
    
    // Extract and parse the JSON response
    const analysisText = response.choices[0].message.content;
    const analysis = JSON.parse(analysisText);

    // Return the analysis as JSON
    return NextResponse.json({ 
      success: true, 
      analysis,
      usage: response.usage
    });

  } catch (error) {
    console.error('OpenAI Analysis Error:', error);
    
    // Add more detailed error info for debugging
    const errorDetails = {
      message: error.message,
      name: error.name,
      stack: error.stack?.split('\n').slice(0, 3).join('\n')
    };
    
    if (error.response) {
      errorDetails.statusCode = error.response.status;
      errorDetails.responseData = error.response.data;
    }
    
    console.error('Detailed error:', JSON.stringify(errorDetails, null, 2));
    
    return NextResponse.json({ 
      error: 'Failed to analyze content',
      details: error.message,
      errorInfo: errorDetails
    }, { status: 500 });
  }
}
