import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { OPENAI_MODEL } from '@/utils/apiConfig';

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
    let content, fileType, fileName, metadata;
    
    // Check the content type to determine how to parse the request
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('multipart/form-data')) {
      // Handle FormData submissions (file uploads)
      const formData = await request.formData();
      const file = formData.get('file');
      fileType = formData.get('fileType');
      
      if (file) {
        // Get file content as text
        content = await file.text();
        fileName = file.name;
      }
    } else {
      // Handle JSON submissions (URLs and direct text)
      const jsonData = await request.json();
      content = jsonData.content;
      fileType = jsonData.fileType;
      fileName = jsonData.fileName;
      metadata = jsonData.metadata;
    }

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    // Prepare prompt based on file type
    let promptContent = '';
    let modelToUse = OPENAI_MODEL; // Use the model from config

    switch (fileType) {
      case 'image':
        // For images, the content will be a base64 string that we'll use with vision API
        promptContent = `Carefully analyze this image of a form or document. Your main task is to identify ALL input fields with 100% accuracy and completeness. Look for text fields, checkboxes, radio buttons, dropdown menus, and any other form elements. Don't miss any fields, even those in less obvious locations. Return a structured JSON response with these elements.`;
        // Model is already set to OPENAI_MODEL, no need to override
        break;
      case 'pdf':
      case 'document':
        promptContent = `Carefully analyze this ${fileType} content that represents a form or document. Your main task is to identify ALL input fields with 100% accuracy and completeness. Look for text fields, checkboxes, radio buttons, dropdown menus, and any other form elements. Don't miss any fields, even those in less obvious locations. Format your response as JSON.`;
        break;
      default:
        promptContent = `Carefully analyze this content that represents a form or document. Your main task is to identify ALL input fields with 100% accuracy and completeness. Look for text fields, checkboxes, radio buttons, dropdown menus, and any other form elements. Don't miss any fields, even those in less obvious locations. Format your response as JSON.`;
    }

    // Define system message for consistent output formatting
    const systemMessage = `You are FormBuddy, an expert at detecting and categorizing form fields in documents.
    
Your primary task is to identify ALL input fields in the document. Focus exclusively and thoroughly on finding every form field and its basic properties.

Analyze the provided content and identify EVERY form input field with full details, including:
- Field label (exact text as shown in the form)
- Input type
- Required status
- Description of what the field is asking for
- Options for selection fields

Format your response as a JSON object with the following structure:
{
  "fields": [
    {
      "label": "Field label",
      "type": "text|select|checkbox|radio|date|textarea|email|tel|number|password|url|time",
      "required": true|false,
      "description": "What this field is asking for",
      "placeholder": "Example placeholder text",
      "options": ["Option 1", "Option 2"] // Only for select, checkbox, or radio fields
    }
  ]
}

Be exhaustive in your field identification:
1. Identify EVERY field in the document, don't miss any - this is critical
2. Look carefully in all areas of the document for form fields, including margins, footers, and less prominent areas
3. Determine the correct input type (text, email, checkbox, radio, select, textarea, etc.)
4. Identify if fields are required or optional based on context clues like asterisks (*) or "required" text
5. Include descriptive text about what each field is asking for
6. For select, radio, and checkbox fields, list all the possible options from the form
7. Include placeholder text if visible in the form

The "fields" array must contain EVERY form field detected in the document, with no omissions. Accuracy and completeness of field detection is the highest priority.`;

    // Create the API call parameters
    let apiParams = {
      model: modelToUse,
      messages: [
        {
          role: 'system',
          content: systemMessage
        }
      ],
      temperature: 0.2, // Lower temperature for more focused, accurate field detection
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
              ? `${promptContent}\n\nThis is a critical task - please examine every part of the image to ensure you don't miss any form fields. If you see any text entry areas, buttons, checkboxes, or form elements, include them in your results.\n\nFile metadata:\n${metadata}`
              : `${promptContent}\n\nThis is a critical task - please examine every part of the image to ensure you don't miss any form fields. If you see any text entry areas, buttons, checkboxes, or form elements, include them in your results.` 
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
    const initialAnalysis = JSON.parse(analysisText);
    
    // Check if we have fields to enhance
    let analysis = initialAnalysis;
    if (initialAnalysis && initialAnalysis.fields && initialAnalysis.fields.length > 0) {
      try {
        // Step 1: Make a second API call to enhance the explanations
        console.log('Detected', initialAnalysis.fields.length, 'fields, enhancing explanations...');
        const enhancedFields = await enhanceFieldExplanations(initialAnalysis.fields);
        
        // Step 2: Generate TTS for the enhanced fields with character voice text
        console.log('Generating TTS for enhanced fields...');
        const fieldsWithTTS = await generateTTSForFields(enhancedFields);
        
        // Replace the fields with fully enhanced versions (explanations + TTS)
        analysis = {
          ...initialAnalysis,
          fields: fieldsWithTTS
        };
        
        console.log('Successfully enhanced field explanations and generated TTS');
      } catch (enhanceError) {
        console.error('Error enhancing explanations, using original analysis:', enhanceError);
        // Continue with original analysis if enhancement fails
      }
    }

    // Return the analysis as JSON
    return NextResponse.json({ 
      success: true, 
      analysis,
      usage: response.usage,
      enhanced: analysis !== initialAnalysis
    });

  } catch (error) {
    console.error('OpenAI Analysis Error:', error);
    
    // Add more detailed error info for debugging
    const errorDetails = {
      message: error.message,
      name: error.name,
      stack: error.stack?.split('\n').slice(0, 3).join('\n'),
      modelUsed: OPENAI_MODEL
    };
    
    // Check for specific error conditions
    let userMessage = 'Failed to analyze content';
    let statusCode = 500;
    
    if (error.message?.includes('deprecated')) {
      userMessage = 'The AI model is outdated. Please contact support for an update.';
      errorDetails.solution = 'Update the OPENAI_MODEL in apiConfig.js';
    } else if (error.message?.includes('not found') || error.code === 'model_not_found') {
      userMessage = 'AI model not available. Your account may not have access to this model.';
      statusCode = 404;
      errorDetails.solution = 'Check account permissions or update to a different model';
    } else if (error.message?.includes('Rate limit') || error.message?.includes('Request too large') || error.message?.includes('TPM')) {
      userMessage = 'FILE_TOO_LARGE: This file is too large to analyze. Please try taking a screenshot of the important parts and uploading the image instead.';
      statusCode = 429;
      errorDetails.solution = 'Reduce content size or try with screenshots';
    } else if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.length < 10) {
      userMessage = 'API key not properly configured. Please check your setup.';
      statusCode = 401;
    }
    
    if (error.response) {
      errorDetails.statusCode = error.response.status;
      errorDetails.responseData = error.response.data;
    }
    
    console.error('Detailed error:', JSON.stringify(errorDetails, null, 2));
    
    return NextResponse.json({ 
      error: userMessage,
      details: error.message,
      errorInfo: errorDetails
    }, { status: statusCode });
  }
}

/**
 * Makes a second API call to enhance the field explanations with better content
 * @param {Array} fields - The detected form fields from the first analysis
 * @returns {Promise<Array>} Enhanced fields with better explanations
 */
async function enhanceFieldExplanations(fields) {
  if (!fields || !Array.isArray(fields) || fields.length === 0) {
    return fields;
  }
  
  console.log('Enhancing explanations for', fields.length, 'fields');
  
  const systemMessage = `You are FormBuddy, a friendly AI assistant who explains form fields in clear, simple, and engaging ways.
  
Your task is to enhance the explanations for each form field provided. Your explanations should be conversational, friendly, and easy to understand - as if a helpful character is explaining them to the user.

For each field, you must generate:
1. A short, concise description (1-2 sentences max)
2. A detailed explanation of what the field is asking for and why it matters, using simple language
3. Two realistic examples of valid input
4. A helpful tip for filling out the field correctly
5. A characterVoiceText - a friendly, conversational explanation that a cartoon helper character would say (simple language, engaging tone)

Key requirements for your explanations:
- ALWAYS explain any technical terms, jargon, or abbreviations in simple everyday language
- ALWAYS include guidance on how to find or recognize this input field on typical forms (e.g., "You'll usually find this at the top of the form" or "This is typically a small box in the personal information section")
- When explaining fields that ask for sensitive or personal information, reassure users about why this information is needed
- For complex fields (like government IDs, insurance numbers, etc.), break down exactly what the format should look like
- For date fields, specify the expected format (MM/DD/YYYY, etc.)
- For selection fields, mention that users will need to choose from specific options

Be specific, clear, and helpful with your explanations. Use simple language that anyone can understand. The characterVoiceText should feel like a friendly guide speaking directly to the user - imagine explaining it to someone who's never filled out forms before.

CRITICAL REQUIREMENTS FOR THE characterVoiceText:
- DO NOT start with greetings like "Hey there", "Hi", "Hello" or similar phrases
- ALWAYS use direct second-person language ("you" and "your"), NEVER use third-person ("they" or "the user")
- Start the text by directly addressing what the field is for or how to complete it
- Keep the tone friendly and conversational but get straight to the point
- Focus on being helpful and informative without unnecessary preambles`;

  // Map all relevant field information to provide context for explanation generation
  const fieldsOverview = fields.map(field => ({
    label: field.label,
    type: field.type,
    required: field.required,
    description: field.description || "No description available",
    placeholder: field.placeholder || "",
    options: field.options || []
  }));

  const userMessage = `Please enhance the explanations for these form fields:
  
${JSON.stringify(fieldsOverview, null, 2)}

For each field, provide the following JSON structure in your response:
{
  "enhancements": [
    {
      "fieldName": "The field's label exactly as provided",
      "shortDescription": "A brief one-line description of what this field is for",
      "explanation": "A detailed explanation about this field's purpose and how to fill it out correctly",
      "examples": ["Example 1", "Example 2"],
      "tip": "A helpful tip for completing this field correctly",
      "characterVoiceText": "A friendly, conversational explanation that our cartoon helper character would say to explain this field. Use simple, engaging language as if speaking directly to the user."
    },
    ...more fields
  ]
}

The characterVoiceText is particularly important - it should:
- Use conversational, simple language (5th-grade reading level)
- Be engaging and friendly, as if a helpful character is speaking directly to the user
- Be 30-60 words long
- Explain the field in a way that's easy to understand
- Include a bit of encouragement or reassurance where appropriate

Make sure you have one object in the enhancements array for each field I've provided.`;

  try {
    const response = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const responseContent = response.choices[0].message.content;
    console.log('Enhancement response received, parsing JSON...');
    
    let enhancedContent;
    try {
      enhancedContent = JSON.parse(responseContent);
    } catch (jsonError) {
      console.error('Error parsing enhanced content JSON:', jsonError);
      return fields;
    }
    
    // Handle different possible response formats
    let enhancements = [];
    
    if (Array.isArray(enhancedContent)) {
      // Direct array of enhancements
      enhancements = enhancedContent;
    } else if (enhancedContent && enhancedContent.enhancements && Array.isArray(enhancedContent.enhancements)) {
      // Object with enhancements array property
      enhancements = enhancedContent.enhancements;
    } else {
      // Try to extract fields if returned as individual objects
      const potentialEnhancements = [];
      for (const key in enhancedContent) {
        if (typeof enhancedContent[key] === 'object' && enhancedContent[key] !== null) {
          // If any object has fieldName, it might be an enhancement
          if (enhancedContent[key].fieldName) {
            potentialEnhancements.push(enhancedContent[key]);
          }
        }
      }
      
      if (potentialEnhancements.length > 0) {
        enhancements = potentialEnhancements;
      }
    }
    
    if (enhancements.length === 0) {
      console.log('No valid enhancements found in response:', typeof enhancedContent);
      return fields;
    }
    
    console.log('Found', enhancements.length, 'enhancements');

    // Match enhancements with fields and update them
    const enhancedFields = fields.map(field => {
      // Try to find a matching enhancement by field label
      const enhancement = enhancements.find(e => 
        e.fieldName === field.label || 
        (field.label && e.fieldName && e.fieldName.trim().toLowerCase() === field.label.trim().toLowerCase())
      );
      
      if (enhancement) {
        return {
          ...field,
          shortDescription: enhancement.shortDescription || field.shortDescription || field.description,
          explanation: enhancement.explanation || field.explanation || field.description,
          examples: enhancement.examples || field.examples || [],
          tip: enhancement.tip || field.tip || "",
          characterVoiceText: enhancement.characterVoiceText || ""
        };
      }
      return field;
    });

    console.log('Successfully enhanced', enhancedFields.filter(f => f.shortDescription || f.explanation || f.examples?.length > 0).length, 'fields');
    return enhancedFields;
  } catch (error) {
    console.error('Error enhancing field explanations:', error);
    // If enhancement fails, return original fields
    return fields;
  }
}

/**
 * Generates TTS (Text-to-Speech) audio for the character voice text
 * @param {Array} fields - The enhanced form fields with characterVoiceText
 * @returns {Promise<Array>} Fields with added TTS audio data
 */
async function generateTTSForFields(fields) {
  if (!fields || !Array.isArray(fields) || fields.length === 0) {
    return fields;
  }
  
  console.log('Generating TTS for', fields.length, 'fields');
  
  // Process fields in batches to avoid overloading the API
  const batchSize = 5;
  const batches = [];
  
  // Create batches of fields
  for (let i = 0; i < fields.length; i += batchSize) {
    batches.push(fields.slice(i, i + batchSize));
  }
  
  // Process each batch
  const processedFields = [...fields];
  
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const batchPromises = batch.map(async (field, index) => {
      const originalIndex = i * batchSize + index;
      
      try {
        // Skip if no character voice text
        if (!field.characterVoiceText) {
          console.log(`Field "${field.label}" has no characterVoiceText to convert to speech`);
          return field;
        }
        
        // Use the same OpenAI TTS settings as in the tts/route.js file
        const ttsResponse = await openai.audio.speech.create({
          model: 'gpt-4o-mini-tts', // Use the specified model
          voice: 'echo', // Echo voice model
          input: field.characterVoiceText,
          response_format: 'mp3',
          speed: 1.25, // Faster speech for enthusiastic delivery
          instructions: 'Be friendly, optimistic, and a little bit goofy. Express feelings and sound enthusiastic.',
        });
        
        // Convert the response to a buffer
        const buffer = await ttsResponse.arrayBuffer();
        
        // Convert buffer to base64 for storing or transmitting
        const audioBase64 = Buffer.from(buffer).toString('base64');
        
        // Add the audio data to the field
        processedFields[originalIndex] = {
          ...field,
          audioData: `data:audio/mp3;base64,${audioBase64}`
        };
        
        console.log(`Generated TTS for field "${field.label}"`);
        
      } catch (error) {
        console.error(`Error generating TTS for field "${field.label}":`, error);
        // Return original field if TTS generation fails
        return field;
      }
    });
    
    // Wait for all promises in the current batch to complete
    await Promise.all(batchPromises);
    
    // Small delay between batches to avoid rate limits
    if (i < batches.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  console.log('TTS generation completed for all fields');
  return processedFields;
}
