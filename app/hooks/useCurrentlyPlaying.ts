import { trpc } from '~/client/trpcClient';

export function useCurrentlyPlaying() {
    const query = trpc.loader.spotify.getCurrentUserPlayingState.useQuery(
        undefined,
        {
            refetchInterval: 3000, // Refresh every 3 seconds
            refetchIntervalInBackground: true,
            retry: 3,
            retryDelay: 1000,
        }
    );

    return {
        data: query.data,
        loading: query.isLoading,
        error: query.error,
        refetch: query.refetch,
    };
} 