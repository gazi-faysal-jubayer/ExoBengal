# NASA Exoplanet Archive Visualization Platform

An interactive web platform for exploring and visualizing NASA exoplanet data with documentation and AI assistance.

## Features

- 🌍 **Exoplanet Explorer**: Browse and search through thousands of confirmed exoplanets
- 📊 **Interactive Visualizations**: 3D orbital systems, statistical charts, and sky maps
- 🤖 **AI Assistant**: Get help exploring data and generating code with our AI chatbot
- 📚 **Python Package Documentation**: Comprehensive docs for the ExoBengal Python library
- 🎨 **Modern UI/UX**: Beautiful, responsive design with dark mode support
- 🚀 **Real-time Data**: Live updates from NASA Exoplanet Archive

## Tech Stack

- **Frontend**: Next.js 14+, TypeScript, Tailwind CSS
- **Visualizations**: D3.js, Three.js, Recharts, Plotly.js
- **State Management**: Zustand, React Query
- **UI Components**: Radix UI, Framer Motion
- **AI Integration**: OpenAI API, Vercel AI SDK

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- OpenAI API key (for AI features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/gazi-faysal-jubayer/ExoBengal.git
cd ExoBengal/website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file with your environment variables:
```env
# OpenAI API Key (for AI assistant)
OPENAI_API_KEY=your_openai_api_key

# NASA API Key (optional, for enhanced rate limits)
NASA_API_KEY=your_nasa_api_key

# Database URL (for user data and caching)
DATABASE_URL=postgresql://user:password@localhost:5432/exobengal
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
website/
├── app/                    # Next.js app directory
│   ├── (routes)/          # Page routes
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── visualizations/   # Chart and 3D components
│   └── features/         # Feature-specific components
├── lib/                   # Utility functions
├── hooks/                 # Custom React hooks
├── services/              # API services
├── types/                 # TypeScript types
└── public/               # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Contributing

Please read our [Contributing Guide](../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## Acknowledgments

- NASA Exoplanet Archive for providing the data
- The open-source community for the amazing tools and libraries

