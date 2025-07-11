# Form Buddy - AI-Powered Form Analysis

Form Buddy is a web application that helps users understand and navigate through complex forms and documents using AI-powered analysis.

## Features

- Upload and analyze various document types:
  - Images (JPG, PNG, etc.)
  - PDFs
  - Documents (DOCX, TXT)
  - URLs with forms

- AI-powered analysis that identifies:
  - Input fields and their requirements
  - Document sections
  - Important instructions
  - Required actions

## Getting Started

First, set up your environment variables:

1. Create a `.env.local` file in the root directory with:
```
OPENAI_API_KEY=your_openai_api_key_here
```

2. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to use Form Buddy.

## How It Works

1. **Upload**: Users upload a document file or input a URL
2. **Processing**: Click "Generate Explanation" to process the content:
   - Extracts text from documents
   - Uses OCR for images
   - Fetches and parses URLs
3. **Analysis**: The content is sent to OpenAI's API for analysis
4. **Explanation**: Results are displayed in a structured format showing form fields, sections, and requirements

## Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Authentication**: Firebase Authentication
- **AI**: OpenAI API (GPT-4 and Vision models)
- **Document Processing**:
  - PDF handling using Vision API
  - Mammoth.js for DOCX processing
  - Image processing using Vision API

## API Integration

Form Buddy uses the following OpenAI models:

- `gpt-4-turbo` for text documents and websites
- `gpt-4-vision-preview` for images and scanned documents

### Fallback Mechanism

If the OpenAI API is unavailable or not configured, the application falls back to mock explanations to ensure users still get assistance with their documents.

## Deployment

For production deployment, ensure all environment variables are properly configured, especially the OpenAI API key.
#   f r o m - b u d d y 
 
 