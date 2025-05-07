# Spotify User Profile Data

## Overview
This specification describes how to fetch and display the authenticated user's profile data from the Spotify Web API.

## Endpoint
- `GET https://api.spotify.com/v1/me`

## Required Scopes
- `user-read-private`
- `user-read-email`

## Data Fields to Display
- Display Name (`display_name`)
- Profile Image (`images[0].url` if available)
- Email (`email`)
- Country (`country`)
- Spotify URI (`uri`)

## UI Requirements
- Show a loading indicator while fetching data.
- Display an error message if the request fails.
- Present the user profile data in a clean, readable card or section.

## References
- [Spotify Get Current User's Profile](https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile) 