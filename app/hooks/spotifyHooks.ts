import { useEffect, useState } from 'react';
import type { SocialToken } from '~/common/models';

export async function fetchProfile(token: string): Promise<any> {
    const res = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        console.error(await res.text())
        throw new Error('Failed to fetch Spotify profile');
    }
    const data = await res.json();
    return {
        id: data.id,
        name: data.display_name,
        email: data.email,
        image: data.images?.[0]?.url ?? null,
        country: data.country,
        uri: data.uri,
    };
}

export function useSpotifyProfile(token: SocialToken) {
    console.log('>>> token', token);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token?.accessToken) {
            setLoading(false);
            setError('No access token found. Please log in.');
            return;
        }
        setLoading(true);
        setError(null);
        fetchProfile(token.accessToken)
            .then(setProfile)
            .catch((e) => setError(e.message || 'Unknown error'))
            .finally(() => setLoading(false));
    }, [token]);

    return { profile, loading, error };
} 