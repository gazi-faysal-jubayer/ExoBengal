import { NextRequest, NextResponse } from 'next/server';
import { generateResponse } from '@/lib/chatbot';

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  if (!prompt || typeof prompt !== 'string') {
    return NextResponse.json({ error: 'Invalid prompt' }, { status: 400 });
  }

  try {
    const response = await generateResponse(prompt);
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error in API:', error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}
