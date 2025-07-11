# Form Buddy API Routes

This directory contains API routes used by the Form Buddy application.

## `/api/analyze`

Analyzes form content using OpenAI's API.

- **Method:** POST
- **Input:**
  - `content`: The file content (text or base64 image)
  - `fileType`: Type of file being analyzed ('image', 'pdf', 'document', 'website')
  - `fileName`: Name of the file or URL
- **Output:**
  - JSON response with analysis results structured as:
    ```json
    {
      "success": true,
      "analysis": {
        "summary": "...",
        "sections": [...],
        "fields": [...],
        "actionItems": [...]
      },
      "usage": { ... }
    }
    ```

## `/api/fetchUrl`

Fetches content from a URL to avoid CORS issues in the browser.

- **Method:** POST
- **Input:**
  - `url`: The URL to fetch
  - `language`: Optional language code for the Accept-Language header
- **Output:**
  - JSON response with the HTML content:
    ```json
    {
      "success": true,
      "html": "...",
      "url": "..."
    }
    ```

## Environment Setup

These API routes require environment variables to be set in `.env.local`:

- `OPENAI_API_KEY`: Your OpenAI API key

Copy the `.env.local.example` file to `.env.local` and add your actual API key.
