# Spec: Play Widget on Home Page for Authenticated Users

## 1. Overview

- **Goal:** Transform the home page (`app/routes/_index.tsx`) to show different content based on user authentication state:
  - **Not logged in:** Display the current landing page (HeroSection, FeaturesSection, TestimonialsSection, CTASection)
  - **Logged in:** Display a Play Widget showing the user's currently playing Spotify track
- **Backend Integration:** Use existing tRPC endpoint `getCurrentUserPlayingState` from `app/server/router/loader/spotify/getCurrentUserPlayingState.ts`
- **Performance Optimization:** Implement client-side progress bar updates to minimize Spotify API calls

---

## 2. Requirements

### 2.1. Conditional Content Display

- Convert `_index.tsx` from a simple component to a layout that conditionally renders based on authentication state
- Maintain the existing landing page functionality for non-authenticated users
- Show Play Widget for authenticated users

### 2.2. Play Widget Features

The Play Widget should display:
- **Song Title:** Current track name
- **Artist(s):** Comma-separated list of artists
- **Album Artwork:** Display the album cover image
- **Progress Bar:** Visual representation of playback progress
- **Playback Status:** Visual indicator if music is playing or paused

### 2.3. Real-time Progress Updates

- **Initial Load:** Fetch current playing state from tRPC endpoint
- **Progress Animation:** Update progress bar every second on the client-side
- **Periodic Refresh:** Refresh data from backend every 30 seconds to handle track changes
- **API Rate Limiting:** Minimize calls to Spotify API through smart caching

### 2.4. Error Handling

- Handle cases where no music is playing
- Handle Spotify API errors gracefully
- Show appropriate loading states
- Display fallback content when data is unavailable

---

## 3. Technical Implementation

### 3.1. Route Structure Changes

```
app/routes/_index.tsx → Layout component with conditional rendering
├── Unauthenticated: Landing page components
└── Authenticated: Play Widget component
```

### 3.2. Component Architecture

```
_index.tsx (Layout)
├── useAuth() → Check authentication state
├── LandingPageView (existing components)
└── PlayWidgetView
    ├── useCurrentlyPlaying() → tRPC hook
    ├── useProgressTimer() → Client-side progress updates
    ├── PlayWidgetCard → Main widget container
    ├── AlbumArtwork → Image component
    ├── TrackInfo → Song/artist display
    └── ProgressBar → Animated progress indicator
```

### 3.3. Custom Hooks

#### `useCurrentlyPlaying()`
- Calls tRPC `getCurrentUserPlayingState` endpoint
- Refreshes every 30 seconds
- Handles loading and error states
- Returns current playing state data

#### `useProgressTimer()`
- Updates progress bar every second
- Calculates progress based on initial progress + elapsed time
- Resets when new track data is received
- Pauses when track is not playing

### 3.4. Data Flow

1. **Initial Load:**
   - Check authentication state
   - If authenticated, fetch current playing state
   - Display Play Widget with data

2. **Progress Updates:**
   - Start client-side timer if music is playing
   - Update progress bar every 1000ms
   - Continue until track ends or new data received

3. **Periodic Refresh:**
   - Fetch new data every 30 seconds
   - Update Play Widget if track changed
   - Reset progress timer with new data

---

## 4. UI/UX Design

### 4.1. Play Widget Layout
```
┌─────────────────────────────────────────┐
│  [Album Art]  Song Title                │
│      80x80    Artist Name               │
│               ████████▒▒▒▒ 2:15 / 3:42  │
│               [Progress Bar]            │
└─────────────────────────────────────────┘
```

### 4.2. Component Styling (Mantine)
- Use Mantine's `Card` component for the main container
- `Image` component for album artwork with fallback
- `Text` components for song/artist information
- Custom or `Progress` component for the progress bar
- `Group` and `Stack` for layout organization
- Responsive design for mobile compatibility

### 4.3. States

#### Playing State
- Album artwork displayed
- Song title and artist shown
- Animated progress bar
- Play icon or visual indicator

#### Paused State
- Same layout as playing
- Static progress bar
- Pause icon or visual indicator

#### No Music Playing
- Placeholder message: "No music currently playing"
- Spotify logo or generic music icon
- Call-to-action to start playing music

#### Loading State
- Skeleton loading for Play Widget
- Loading spinner for initial data fetch

#### Error State
- Error message with retry option
- Fallback to "Connect your Spotify" message

---

## 5. Implementation Steps

### 5.1. Authentication Integration
1. Add authentication context or hook to determine login state
2. Modify `_index.tsx` to conditionally render based on auth state

### 5.2. Play Widget Components
1. Create `PlayWidget` component in `app/components/`
2. Implement `AlbumArtwork`, `TrackInfo`, and `ProgressBar` subcomponents
3. Add proper TypeScript types for all props

### 5.3. Custom Hooks
1. Implement `useCurrentlyPlaying` hook with tRPC integration
2. Create `useProgressTimer` hook for client-side progress updates
3. Add error handling and loading states

### 5.4. tRPC Integration
1. Ensure tRPC client is properly configured
2. Add proper error handling for the endpoint
3. Implement proper TypeScript types

### 5.5. Testing & Polish
1. Test with different music playing states
2. Test authentication flow integration
3. Verify progress bar accuracy
4. Test error handling scenarios
5. Ensure responsive design

---

## 6. Performance Considerations

### 6.1. API Rate Limiting
- Limit backend calls to every 30 seconds
- Use client-side calculations for progress updates
- Cache responses appropriately

### 6.2. Resource Management
- Clear timers when component unmounts
- Handle memory leaks from intervals
- Optimize re-renders with proper dependency arrays

### 6.3. Loading Optimization
- Show loading states immediately
- Use skeleton screens for better UX
- Preload album artwork images

---

## 7. Security & Best Practices

### 7.1. Authentication
- Verify user authentication before showing Play Widget
- Handle token expiration gracefully
- Redirect to login if authentication fails

### 7.2. Error Handling
- Don't expose sensitive API errors to users
- Provide meaningful error messages
- Implement proper fallback content

### 7.3. Code Quality
- Follow TypeScript strict typing rules
- Use proper async/await patterns
- Implement proper component lifecycle management
- Follow React and tRPC best practices

---

## 8. Future Enhancements

- Add playback controls (play/pause/skip)
- Show listening history
- Add social features (share what you're listening to)
- Implement real-time sync with other users
- Add music recommendations based on current track 