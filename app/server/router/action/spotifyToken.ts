import type { Route } from '../../+types/action/spotifyToken';

export const action: Route.Action = async ({ request }) => {
    const { code } = await request.json();
    const clientId = process.env.VITE_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirectUri = process.env.VITE_SPOTIFY_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
        return new Response(JSON.stringify({ error: 'Missing Spotify credentials' }), { status: 500 });
    }

    const params = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
    });

    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
    });

    if (!res.ok) {
        const error = await res.text();
        return new Response(JSON.stringify({ error }), { status: 400 });
    }
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
}; 