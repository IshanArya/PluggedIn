# Frontend Structure

## Overview
This specification outlines the structure of the client-side application for interacting with the Spotify Web API.

## Framework
- React (with Vite for development/build tooling)

## Main Components
- **App**: Root component, handles routing and global state.
- **Auth**: Handles Spotify OAuth2 login and callback.
- **UserProfile**: Fetches and displays the user's Spotify profile data.
- **Loading/Error**: UI components for loading and error states.

## State Management
- Use React's built-in state and context for managing authentication and user data.
- Store access token in memory (or localStorage for demo purposes).

## Routing
- Use React Router for navigation between login, callback, and profile views.

## Styling
- **Prefer using [Mantine](https://mantine.dev/) components** for UI and styling to ensure a modern, consistent look and rapid development.
- Use Mantine's built-in components for layout, forms, notifications, and theming.
- For custom styles, use Mantine's styling utilities or CSS-in-JS as needed.

## References
- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Mantine Documentation](https://mantine.dev/) 