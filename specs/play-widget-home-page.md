# Spec: Play Widget Dashboard for Authenticated Users

## 1. Overview

- **Goal:** Create a clean separation between the landing page and authenticated user experience:
  - **Home Page (`/`)**: Always shows the landing page for marketing/onboarding
  - **Dashboard Page (`/dashboard`)**: Shows the Play Widget for authenticated users
  - **Redirect Logic**: Home page redirects authenticated users to `/dashboard`
- **Backend Integration:** Use existing tRPC endpoint `getCurrentUserPlayingState` from `app/server/router/loader/spotify/getCurrentUserPlayingState.ts`
- **Performance Optimization:** Implement client-side progress bar updates to minimize Spotify API calls

---

## 2. Requirements

### 2.1. Route Structure

- **Home Page (`/`)**: Landing page with redirect logic for authenticated users
- **Dashboard Page (`/dashboard`)**: Protected route showing Play Widget
- **Authentication Flow**: All login buttons redirect to `/dashboard` after authentication

### 2.2. Home Page Behavior

- **Unauthenticated Users**: Display full landing page (HeroSection, FeaturesSection, TestimonialsSection, CTASection)
- **Authenticated Users**: Redirect to `/dashboard` using React Router loader redirect

### 2.3. Dashboard Page Features

The Dashboard should display the Play Widget with:
- **Song Title:** Current track name
- **Artist(s):** Comma-separated list of artists
- **Album Artwork:** Display the album cover image
- **Progress Bar:** Visual representation of playback progress
- **Playback Status:** Visual indicator if music is playing or paused

### 2.4. Real-time Progress Updates

- **Initial Load:** Fetch current playing state from tRPC endpoint
- **Progress Animation:** Update progress bar every second on the client-side
- **Periodic Refresh:** Refresh data from backend every 3 seconds to handle track changes
- **API Rate Limiting:** Minimize calls to Spotify API through smart caching

### 2.5. Error Handling

- Handle cases where no music is playing
- Handle Spotify API errors gracefully
- Show appropriate loading states
- Display fallback content when data is unavailable

---

## 3. Technical Implementation

### 3.1. Route Structure Changes

```
app/routes/
├── _index.tsx → Landing page with auth redirect logic
└── dashboard.tsx → New protected route with Play Widget
```

### 3.2. Component Architecture

```
_index.tsx (Landing Page + Redirect)
├── useLoaderData() → Check authentication state
├── LandingPageView (existing components)
└── redirect() → Redirect to /dashboard if authenticated

dashboard.tsx (Protected Dashboard)
├── useLoaderData() → Authentication check + protection
├── PlayWidgetContainer → Main dashboard content
└── Error boundaries for auth failures
```

### 3.3. Authentication Flow

```
1. User visits / (home)
2. Loader checks authentication
3. If authenticated: redirect to /dashboard
4. If not authenticated: show landing page

1. User clicks login button
2. OAuth flow with callbackURL=/dashboard
3. User redirected to /dashboard after success
4. Dashboard loader verifies auth and shows Play Widget
```

### 3.4. Data Flow

1. **Dashboard Load:**
   - Check authentication in loader
   - Redirect to home if not authenticated
   - Fetch current playing state
   - Display Play Widget with data

2. **Progress Updates:**
   - Start client-side timer if music is playing
   - Update progress bar every 1000ms
   - Continue until track ends or new data received

3. **Periodic Refresh:**
   - Fetch new data every 3 seconds
   - Update Play Widget if track changed
   - Reset progress timer with new data

---

## 4. UI/UX Design

### 4.1. Dashboard Layout
```
┌─────────────────────────────────────────┐
│                Dashboard                │
│                                         │
│  ┌─────────────────────────────────────┐ │
│  │  [Album Art]  Song Title            │ │
│  │      80x80    Artist Name           │ │
│  │               ████████▒▒▒▒ 2:15/3:42│ │
│  │               [Progress Bar]        │ │
│  └─────────────────────────────────────┘ │
│                                         │
│         (Future dashboard features)     │
└─────────────────────────────────────────┘
```

### 4.2. Component Styling (Mantine)
- Use Mantine's `Container` for dashboard layout
- `Card` component for the Play Widget
- `Image` component for album artwork with fallback
- `Text` components for song/artist information
- Custom or `Progress` component for the progress bar
- `Group` and `Stack` for layout organization
- Responsive design for mobile compatibility

---

## 5. Implementation Steps

### 5.1. Update Login Flow
1. Update all `LoginButton` components to use `/dashboard` callbackURL
2. Change default callbackURL in `LoginButton.tsx` to `/dashboard`

### 5.2. Modify Home Page
1. Add redirect logic to `_index.tsx` loader
2. Keep existing landing page components for unauthenticated users

### 5.3. Create Dashboard Route
1. Create new `app/routes/dashboard.tsx` file
2. Add authentication protection in loader
3. Integrate existing `PlayWidgetContainer`

### 5.4. Component Migration
1. Move Play Widget components (already created)
2. Update imports and routing
3. Test authentication flow

### 5.5. Testing & Polish
1. Test redirect flows
2. Test dashboard authentication protection
3. Verify Play Widget functionality
4. Test error scenarios

---

## 6. Performance Considerations

### 6.1. API Rate Limiting
- Limit backend calls to every 3 seconds
- Use client-side calculations for progress updates
- Cache responses appropriately

### 6.2. Route Protection
- Server-side authentication checks in loaders
- Proper redirects for unauthorized access
- Clean error handling for auth failures

### 6.3. Loading Optimization
- Show loading states immediately
- Use skeleton screens for better UX
- Preload album artwork images

---

## 7. Security & Best Practices

### 7.1. Route Protection
- Verify user authentication in dashboard loader
- Redirect to home page if not authenticated
- Handle token expiration gracefully

### 7.2. Error Handling
- Don't expose sensitive API errors to users
- Provide meaningful error messages
- Implement proper fallback content

### 7.3. Code Quality
- Follow TypeScript strict typing rules
- Use proper async/await patterns
- Implement proper component lifecycle management
- Follow React Router and tRPC best practices

---

## 8. Future Enhancements

- Add more dashboard features (listening history, friends, etc.)
- Add playback controls (play/pause/skip)
- Add social features (share what you're listening to)
- Implement real-time sync with other users
- Add music recommendations based on current track 