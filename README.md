# PluggedIn - Connect Through Music

A modern Spotify integration app that allows users to share their currently playing music and connect with friends through their listening experiences.

## Features

- 🎵 **Spotify Integration**: OAuth2 authentication with Spotify
- 🎯 **Play Widget**: Real-time display of currently playing track with progress bar
- 🔄 **Live Updates**: Auto-refreshing music state every 3 seconds
- ⚡️ **Smart Progress**: Client-side progress bar updates to minimize API calls
- 🎨 **Modern UI**: Built with Mantine components for beautiful, responsive design
- 🚀 **Full-Stack TypeScript**: Type-safe from database to UI
- 📡 **tRPC Integration**: End-to-end type safety for API calls
- 🔒 **Secure Authentication**: Session-based auth with proper token management

## Architecture

### Frontend Components
- **Conditional Home Page**: Shows landing page for anonymous users, Play Widget for authenticated users
- **Modular Play Widget**: Composed of reusable components (AlbumArtwork, TrackInfo, ProgressBar)
- **Custom Hooks**: `useAuth`, `useCurrentlyPlaying`, `useProgressTimer` for clean state management

### Backend
- **tRPC Procedures**: Type-safe API endpoints for Spotify integration
- **Authentication Middleware**: Secure session management
- **Spotify API Integration**: Real-time music data fetching

## Getting Started

### Prerequisites
- Node.js 18+
- Spotify Developer Account
- Spotify App with OAuth2 credentials

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pluggedin
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Add your Spotify client ID, secret, and other required variables
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Type Checking

Run TypeScript type checking:

```bash
npm run typecheck
```

## Play Widget Features

When authenticated, users see a beautiful Play Widget that displays:

- **Album Artwork**: 80x80px album cover with fallback icon
- **Track Information**: Song title and artist names
- **Progress Bar**: Real-time progress with current/total time display
- **Playback Status**: Visual indicators for playing/paused state
- **Auto-Updates**: Refreshes every 3 seconds to catch track changes
- **Smart Timing**: Client-side progress updates every second

### States Handled
- **Loading**: Skeleton screen while fetching data
- **Error**: Retry functionality with user-friendly messages
- **No Music Playing**: Helpful prompt to start playing music
- **Active Playback**: Full widget with all features

## Technical Implementation

### Performance Optimizations
- **API Rate Limiting**: Backend calls limited to every 3 seconds
- **Client-Side Progress**: Smooth progress bar without constant API hits
- **Proper Cleanup**: Timer management to prevent memory leaks
- **Error Boundaries**: Graceful error handling throughout

### Component Architecture
Following modular design principles:
- Single Responsibility components
- Container/Presentation pattern separation
- Reusable, composable components
- Proper TypeScript interfaces

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

The app includes Docker support and can be deployed to any platform supporting Node.js applications.

---

Built with ❤️ using React Router, tRPC, Mantine, and the Spotify Web API.
