import { NextResponse } from 'next/server';

/**
 * API endpoint to fetch a URL's content
 * This is used to avoid CORS issues when fetching URLs from the browser
 * @param {Request} request - Contains the URL to fetch
 * @returns {NextResponse} JSON response with the HTML content
 */
export async function POST(request) {
  try {
    const { url, language } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    // Set headers to mimic a browser request
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': language || 'en-US,en;q=0.5',
      'Referer': 'https://www.google.com/'
    };

    // Fetch the URL content
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      return NextResponse.json({ 
        success: false,
        error: `Failed to fetch URL: ${response.status} ${response.statusText}` 
      }, { status: response.status });
    }

    // Get the HTML content
    const html = await response.text();

    return NextResponse.json({ 
      success: true, 
      html,
      url
    });

  } catch (error) {
    console.error('URL fetch error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to fetch URL: ' + error.message 
    }, { status: 500 });
  }
}
