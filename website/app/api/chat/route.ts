import { NextRequest, NextResponse } from 'next/server'
import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

// System prompt for the exoplanet assistant
const SYSTEM_PROMPT = `You are ExoBot, an AI assistant specialized in exoplanet science and the NASA Exoplanet Archive. You help users explore and understand exoplanet data, discovery methods, and the search for life beyond Earth.

Your knowledge includes:
- Exoplanet detection methods (transit, radial velocity, microlensing, direct imaging, astrometry)
- Planetary system architectures and orbital dynamics
- Stellar properties and their effect on planetary habitability
- The habitable zone concept and biosignature detection
- Current and past exoplanet missions (Kepler, TESS, James Webb, etc.)
- Statistical analysis of exoplanet populations
- Python programming for astronomical data analysis

You can help users:
- Search and filter exoplanet data
- Understand discovery methods and their limitations
- Analyze planetary and stellar parameters
- Generate Python code for data analysis
- Explain scientific concepts in accessible terms
- Suggest interesting exoplanets to explore
- Interpret visualizations and charts

Always provide accurate, scientific information and cite sources when appropriate. If you're unsure about recent discoveries or specific data values, acknowledge the uncertainty and suggest checking the NASA Exoplanet Archive for the most current information.

Keep responses concise but informative, and offer to help with follow-up questions or deeper analysis.`

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    // Add system message if not present
    const messagesWithSystem = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages,
    ]

    const result = await streamText({
      model: openai('gpt-4-turbo-preview'),
      messages: messagesWithSystem,
      temperature: 0.7,
      maxTokens: 1000,
    })

    return result.toAIStreamResponse()
  } catch (error) {
    console.error('Error in chat API:', error)
    
    // Return a fallback response if OpenAI fails
    return NextResponse.json({
      error: 'Sorry, I\'m having trouble processing your request right now. Please try again later.',
      fallback: true,
      suggestions: [
        'Try asking about specific exoplanets like Kepler-452b',
        'Ask about detection methods like transit photometry',
        'Request help with data analysis or Python code',
        'Inquire about the habitable zone concept',
      ]
    }, { status: 500 })
  }
}

// Handle GET requests for chat suggestions or help
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  if (type === 'suggestions') {
    const suggestions = {
      popular_questions: [
        "What makes a planet potentially habitable?",
        "How does the transit method work?",
        "Show me Earth-like exoplanets",
        "What is the habitable zone?",
        "Generate Python code to analyze hot Jupiters",
        "Compare Kepler-452b to Earth",
        "What are the different detection methods?",
        "Which exoplanets might have life?",
      ],
      example_queries: [
        "Find all planets discovered by TESS in 2023",
        "Show me super-Earths in the habitable zone",
        "What's the most massive exoplanet?",
        "Explain radial velocity detection",
        "Plot the mass-radius relationship",
        "Which stars are most likely to have planets?",
      ],
      help_topics: [
        "Data analysis and statistics",
        "Python programming for astronomy",
        "Understanding discovery methods",
        "Interpreting visualizations",
        "Exoplanet mission updates",
        "Habitability assessment",
      ]
    }

    return NextResponse.json(suggestions)
  }

  if (type === 'context') {
    // Return context about current exoplanet data
    const context = {
      total_confirmed: 5565,
      total_candidates: 4140,
      latest_discoveries: [
        "TOI-715 b - Super-Earth in habitable zone",
        "WASP-193b - Ultra-low density planet",
        "LP 890-9 c - Potentially habitable",
      ],
      active_missions: [
        "TESS - Transiting Exoplanet Survey Satellite",
        "JWST - James Webb Space Telescope",
        "CHEOPS - Characterising Exoplanets Satellite",
      ],
      database_last_updated: new Date().toISOString().split('T')[0],
    }

    return NextResponse.json(context)
  }

  return NextResponse.json({
    message: "ExoBot AI Assistant",
    description: "Ask me anything about exoplanets, detection methods, or data analysis!",
    capabilities: [
      "Exoplanet data search and analysis",
      "Scientific explanations and education",
      "Python code generation",
      "Data visualization guidance",
      "Mission and discovery updates",
    ]
  })
}
