import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { text, userId } = await request.json();

    if (!text || !userId) {
      return NextResponse.json({ error: 'Text and userId are required' }, { status: 400 });
    }

    // Generate speech using OpenAI TTS
    const mp3 = await openai.audio.speech.create({
      model: 'gpt-4o-mini-tts', // Use the specified model
      voice: 'echo', // Echo voice model
      input: text,
      response_format: 'mp3',
      speed: 1.25, // Faster speech for enthusiastic delivery
      instructions: 'Be friendly, optimistic, and a little bit goofy. Express feelings and sound enthusiastic.',
    });

    // Convert the audio to a buffer
    const buffer = Buffer.from(await mp3.arrayBuffer());

    // Create a unique filename
    const filename = `greeting_${userId}_${Date.now()}.mp3`;

    // In a production app, you'd want to upload this to a cloud storage service
    // For now, we'll create a data URL or return the buffer
    const base64Audio = buffer.toString('base64');
    const audioDataUrl = `data:audio/mpeg;base64,${base64Audio}`;

    return NextResponse.json({ 
      success: true, 
      audioUrl: audioDataUrl,
      filename: filename
    });

  } catch (error) {
    console.error('OpenAI TTS Error:', error);
    return NextResponse.json({ 
      error: 'Failed to generate speech',
      details: error.message 
    }, { status: 500 });
  }
}
