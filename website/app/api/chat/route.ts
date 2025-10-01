import { NextRequest, NextResponse } from 'next/server';
import { generateResponse, formatResponse } from '@/lib/chatbot';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    // Validate prompt
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Invalid prompt. Please provide a valid string.' },
        { status: 400 }
      );
    }

    // Validate prompt length to prevent abuse
    if (prompt.length > 4000) {
      return NextResponse.json(
        { error: 'Prompt too long. Please keep it under 4000 characters.' },
        { status: 400 }
      );
    }

    // Generate AI response
    const response = await generateResponse(prompt);
    console.log('AI Response:', response);
    
    // const jsonMatch = response.match(/```json\s*\n([\s\S]*?)\n```/);
    // const jsonString = jsonMatch ? jsonMatch[1] : response;
    // const jsonRes=JSON.parse(jsonString);
    const jsonRes=formatResponse(response);

    if(jsonRes.type === "text"){
      return NextResponse.json(jsonRes, { status: 200 });
    }
    else if(jsonRes.type === "exoplanet_detection"){
      const cerebriumRes = await fetch(
        'https://api.aws.us-east-1.cerebrium.ai/v4/p-e08fc93f/exobengal-api/predict',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ item: jsonRes.response }),
        }
      );

      const cerebriumData = await cerebriumRes.json();
      console.log('Cerebrium Response:', cerebriumData);
      const resultPrompt=`interpret the result: ${JSON.stringify(cerebriumData)}`;
      const finalResponse = await generateResponse(resultPrompt);
      const resultJsonRes=formatResponse(finalResponse);
      return NextResponse.json(resultJsonRes, { status: 200 });
      // return NextResponse.json(response, { status: 200 });
    }

  } catch (error) {
    console.error('Error in chat API:', error);
    
    // Handle specific error types
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON format in request.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate response. Please try again.' },
      { status: 500 }
    );
  }
}

// Handle unsupported HTTP methods
export async function GET() {
  return NextResponse.json(
    { 
      error: 'Method not allowed. Use POST to send chat messages.',
      allowedMethods: ['POST']
    },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { 
      error: 'Method not allowed. Use POST to send chat messages.',
      allowedMethods: ['POST']
    },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { 
      error: 'Method not allowed. Use POST to send chat messages.',
      allowedMethods: ['POST']
    },
    { status: 405 }
  );
}
