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

### 5. Fetch User Info in Header (SSR)
- Fetch user info from the loader to enable server-side rendering (SSR) of the header.
- Use a data fetching hook (e.g., useLoaderData) in the header to get the user info from the loader.
- Conditionally render the login button or user name based on the fetched data.

## Relevant Files
- `app/components/HeaderContent.tsx`
- `app/components/LoginButton.tsx` (to be created)
- `app/routes/login.tsx`
- `app/server/router/loader/user.ts` (to be created)
- `app/server/trpc.ts`
- `SPECS.md`

## Acceptance Criteria
- The header displays a "LogIn with Spotify" button if the user is not logged in.
- Clicking the button initiates the Spotify login flow.
- After login, the header displays the user's name.
- User info is fetched securely from the backend and supports SSR. 