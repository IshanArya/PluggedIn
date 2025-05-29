import { useEffect, useRef, useState } from 'react';
import type { SpotifyCurrentPlayingState } from '~/common/models';

export function useProgressTimer(playingState: SpotifyCurrentPlayingState | undefined) {
    const [currentProgress, setCurrentProgress] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number>(Date.now());

    useEffect(() => {
        // Clear existing interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        if (!playingState?.track || !playingState.isPlaying) {
            // If not playing, use the progress from the API
            setCurrentProgress(playingState?.progressMs || 0);
            return;
        }

        // Initialize progress from API data
        const initialProgress = playingState.progressMs || 0;
        setCurrentProgress(initialProgress);
        startTimeRef.current = Date.now();

        // Start interval for progress updates
        intervalRef.current = setInterval(() => {
            const elapsed = Date.now() - startTimeRef.current;
            const newProgress = initialProgress + elapsed;

            // Don't exceed track duration
            if (playingState.track && newProgress >= playingState.track.durationMs) {
                setCurrentProgress(playingState.track.durationMs);
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
            } else {
                setCurrentProgress(newProgress);
            }
        }, 1000);

        // Cleanup function
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [playingState?.track?.id, playingState?.isPlaying, playingState?.progressMs]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return currentProgress;
} 