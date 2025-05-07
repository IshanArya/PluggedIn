import type { Route } from '../../+types/loader/spotifyMe';

export const loader: Route.Loader = async ({ request }) => {
    const auth = request.headers.get('authorization');
    if (!auth || !auth.startsWith('Bearer ')) {
        return new Response(JSON.stringify({ error: 'Missing or invalid token' }), { status: 401 });
    }
    const token = auth.replace('Bearer ', '');
    const res = await fetch('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
        const error = await res.text();
        return new Response(JSON.stringify({ error }), { status: 400 });
    }
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
}; 