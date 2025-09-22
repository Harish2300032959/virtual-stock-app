# Virtual Stock Trading App

A comprehensive virtual stock trading platform built with Next.js, TypeScript, and Tailwind CSS. Perfect for learning stock trading without financial risk.

## Features

- **Authentication System**: Secure login and registration
- **Real-time Dashboard**: Portfolio overview with interactive charts
- **Market Explorer**: Browse and search stocks with detailed information
- **Virtual Trading**: Buy and sell stocks with virtual money
- **Educational Content**: Tutorials and market news
- **Portfolio Management**: Track holdings and performance
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Charts**: Recharts
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd virtual-stock-trading-app
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.local.example .env.local
\`\`\`

Edit `.env.local` with your configuration:
- `NEXT_PUBLIC_API_URL`: Your backend API URL
- `STOCK_API_KEY`: API key for stock data (server-side only)
- `NEXT_PUBLIC_USE_MOCK_DATA`: Set to `true` to use mock data

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL`
   - `STOCK_API_KEY`
   - `NEXT_PUBLIC_USE_MOCK_DATA`
4. Deploy automatically on push

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

| Variable | Description | Required | Client/Server |
|----------|-------------|----------|---------------|
| `NEXT_PUBLIC_API_URL` | Backend API endpoint | Yes | Client |
| `STOCK_API_KEY` | Stock data API key | No* | Server |
| `NEXT_PUBLIC_USE_MOCK_DATA` | Use mock data instead of real API | No | Client |

*Required only when using real stock data APIs

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages
│   ├── market/           # Market and stock pages
│   ├── portfolio/        # Portfolio management
│   ├── trade/           # Trading functionality
│   ├── news/            # Market news
│   ├── tutorials/       # Educational content
│   └── profile/         # User profile
├── components/           # Reusable components
├── contexts/            # React contexts
├── lib/                # Utilities and configurations
├── types/              # TypeScript type definitions
└── public/             # Static assets
\`\`\`

## API Integration

The app is designed to work with mock data by default. To integrate with real stock APIs:

1. Set `NEXT_PUBLIC_USE_MOCK_DATA=false`
2. Add your `STOCK_API_KEY` 
3. Update API endpoints in `lib/axios.ts`
4. Implement server-side API routes in `app/api/`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue on GitHub or contact the development team.
\`\`\`

\`\`\`json file="" isHidden
