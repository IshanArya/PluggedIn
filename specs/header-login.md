# Header Login Functionality Plan

## Overview
This document outlines the step-by-step plan to add Spotify login functionality to the application header. The goal is to provide a login button in the header that, when clicked, initiates the Spotify OAuth flow. Once logged in, the button will display the user's name, fetched from the backend via tRPC and a new loader.

## Steps

### 1. Reference Existing Login Functionality
- Review the sign-in logic in `app/routes/login.tsx`.
- The login flow uses `authClient.signIn.social` for Spotify and a PKCE flow for OAuth.

### 2. Create a Generic Login Button Component
- Create a new generic `LoginButton.tsx` component in `app/components/`.
- This button will support Spotify login for now, but should be designed to allow for additional providers in the future.
- The button will be used in the header content component.

### 3. Update HeaderContent
- Update `app/components/HeaderContent.tsx` to include the new login button.
- If the user is logged in, display their name instead of the button.
- Use context/session data to determine login state.

### 4. Expose User Info via Loader
- Create a new loader in `app/server/router/loader/user.ts`.
- This loader will return the current user's information (e.g., name, email) from the session.
- The loader will use the context/session as set up in `app/server/trpc.ts`.

### 5. Use a React Router Layout for SSR User State
- Create a top-level React Router layout route (e.g., `app/routes/__header.tsx`) with a loader that fetches user info from the tRPC endpoint on the server.
- Provide this user info to the header (and any children) via `useLoaderData`, ensuring the login state is available at render time (SSR).
- The header should use this loader data to conditionally render the login button or user name.
- Do not rely solely on client-side tRPC queries for login state in the header.

## Relevant Files
- `app/components/HeaderContent.tsx`
- `app/components/LoginButton.tsx`
- `app/routes/login.tsx`
- `app/server/router/loader/user.ts`
- `app/server/trpc.ts`
- `app/routes/__header.tsx` (to be created)
- `SPECS.md`

## Acceptance Criteria
- The header displays a "LogIn with Spotify" button if the user is not logged in.
- Clicking the button initiates the Spotify login flow.
- After login, the header displays the user's name.
- User info is fetched securely from the backend and supports SSR via a React Router layout/loader. 