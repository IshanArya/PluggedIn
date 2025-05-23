# Spec: Get Current User Playing State from Spotify

## 1. Overview

- **Goal:** Expose a backend endpoint to retrieve the currently playing track for the authenticated user from Spotify.
- **Spotify API Used:** `GET /me/player/currently-playing`
- **Backend Endpoint Location:** `app/server/router/loader/spotify/getCurrentUserPlayingState.ts`
- **TRPC Integration:** Endpoint will be accessible via tRPC.
- **Type Definition:** A new type describing the response will be added to `app/common/models.ts`.

---

## 2. Steps

### 2.1. Define the Response Type

- Create a new type in `app/common/models.ts` (e.g., `SpotifyCurrentPlayingState`).
- The type should include:
  - `track?`: Track name, id, duration, and artist information (if playing).
  - `albumArtworkUrl?`: URL to the album artwork image.
  - `isPlaying`: Boolean indicating if something is currently playing.
  - `progressMs?`: Current progress in milliseconds.

### 2.2. Implement Loader Endpoint

- Create a new file: `app/server/router/loader/spotify/getCurrentUserPlayingState.ts`.
- Export a function (e.g., `getCurrentUserPlayingState`) that:
  - Accepts the tRPC context (to access the user's Spotify access token).
  - Calls the Spotify API `/me/player/currently-playing` with the user's access token.
  - Handles possible errors (e.g., not authenticated, no track playing, token expired).
  - Maps the Spotify API response to the new type.

### 2.3. Integrate with tRPC

- Register the loader in the appropriate tRPC router (if not already, create a `spotify` router).
- Ensure the endpoint is accessible via tRPC from the frontend.

### 2.4. Error Handling

- If the user is not authenticated or has no Spotify token, return an appropriate error.
- If nothing is currently playing, return a response with `isPlaying: false` and other fields omitted.

---

## 3. Example Type (`models.ts`)

```typescript
export type SpotifyCurrentPlayingState = {
  track?: {
    id: string;
    name: string;
    artists: string[];
    durationMs: number;
  };
  albumArtworkUrl?: string;
  isPlaying: boolean;
  progressMs?: number;
};
```

---

## 4. Example Response

```json
{
  "track": {
    "id": "track456",
    "name": "Song Title",
    "artists": ["Artist 1", "Artist 2"],
    "durationMs": 210000
  },
  "albumArtworkUrl": "https://i.scdn.co/image/...",
  "isPlaying": true,
  "progressMs": 105000
}
```

---

## 5. Security & Best Practices

- Ensure the Spotify access token is securely retrieved from the session/context.
- Do not expose sensitive user or token information in the response.
- Follow project rules for type safety, error handling, and async/await usage. 