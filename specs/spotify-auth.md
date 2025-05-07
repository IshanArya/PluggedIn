# Spotify OAuth2 Authentication

## Overview
This specification covers the authentication process required for accessing user data from the Spotify Web API. The application must use Spotify's OAuth2 Authorization Code Flow to obtain access tokens on behalf of the user.

## Prerequisites
- The Spotify application has already been created in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
- The Client ID and Client Secret are stored in the `.env` file as environment variables.

## Steps
1. **Authorization Request**: Redirect the user to Spotify's authorization endpoint with the required scopes and redirect URI.
2. **Authorization Code Grant**: After user consent, Spotify redirects back with an authorization code.
3. **Token Exchange**: Exchange the authorization code for an access token and refresh token.
4. **Token Storage**: Store tokens securely on the client (for this demo, in-memory or localStorage).

## Required Scopes
- `user-read-private`
- `user-read-email`

## Endpoints
- Authorization: `https://accounts.spotify.com/authorize`
- Token: `https://accounts.spotify.com/api/token`

## Redirect URI
- Must match the URI registered in the Spotify Developer Dashboard.

## References
- [Spotify Authorization Guide](https://developer.spotify.com/documentation/web-api/tutorials/code-flow) 