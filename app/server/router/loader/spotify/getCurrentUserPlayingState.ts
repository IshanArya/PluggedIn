import type { SpotifyCurrentPlayingState } from 'app/common/models';
import { p } from '~/server/trpc';

export const getCurrentUserPlayingState = p.auth.query(async ({ ctx }): Promise<SpotifyCurrentPlayingState> => {
    const accessToken = ctx.token?.accessToken;
    if (!accessToken) {
        return { isPlaying: false };
    }

    try {
        const res = await fetch('https://api.spotify.com/v1/me/player', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (res.status === 204) {
            // No content: nothing is playing
            console.error('>>> No content: nothing is playing');
            return { isPlaying: false };
        }
        if (!res.ok) {
            // Token expired or other error
            console.error('>>> Token expired or other error');
            return { isPlaying: false };
        }

        const data = await res.json();
        if (!data || !data.item) {
            console.log('>>> No data or no item');
            return { isPlaying: false };
        }

        const track = data.item;
        const artists = Array.isArray(track.artists)
            ? track.artists.map((a: any) => a.name)
            : [];
        const albumArtworkUrl = track.album?.images?.[0]?.url;

        return {
            track: {
                id: track.id,
                name: track.name,
                artists,
                durationMs: track.duration_ms,
            },
            albumArtworkUrl,
            isPlaying: data.is_playing ?? false,
            progressMs: data.progress_ms,
            device: data.device ? {
                name: data.device.name,
                type: data.device.type,
            } : undefined,
        };
    } catch (err) {
        // TODO: Refine error handling, add Zod validation per trpc-best-practices
        return { isPlaying: false };
    }
}); 