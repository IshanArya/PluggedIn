import { Button, Card, Center, Group, Loader, Stack, Text } from '@mantine/core';
import { IconBrandSpotifyFilled, IconMusic, IconPlayerPause, IconPlayerPlay } from '@tabler/icons-react';
import type { SpotifyCurrentPlayingState } from '~/common/models';
import { AlbumArtwork } from './AlbumArtwork';
import { ProgressBar } from './ProgressBar';
import { TrackInfo } from './TrackInfo';

interface PlayWidgetProps {
    data?: SpotifyCurrentPlayingState;
    progress: number;
    loading: boolean;
    error?: any;
    onRetry?: () => void;
}

export function PlayWidget({ data, progress, loading, error, onRetry }: PlayWidgetProps) {
    if (loading) {
        return (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Center p="xl">
                    <Stack align="center" gap="md">
                        <Loader color="green" />
                        <Text size="sm" c="dimmed">Loading your music...</Text>
                    </Stack>
                </Center>
            </Card>
        );
    }

    if (error) {
        return (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Center p="xl">
                    <Stack align="center" gap="md">
                        <IconMusic size={48} color="var(--mantine-color-gray-6)" />
                        <Text size="sm" c="dimmed" ta="center">
                            Failed to load your music
                        </Text>
                        {onRetry && (
                            <Button variant="light" size="sm" onClick={onRetry}>
                                Try Again
                            </Button>
                        )}
                    </Stack>
                </Center>
            </Card>
        );
    }

    if (!data?.isPlaying || !data?.track) {
        return (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Center p="xl">
                    <Stack align="center" gap="md">
                        <IconMusic size={48} color="var(--mantine-color-gray-6)" />
                        <Text size="sm" c="dimmed" ta="center">
                            No music currently playing
                        </Text>
                        <Text size="xs" c="dimmed" ta="center">
                            Start playing music on Spotify to see it here
                        </Text>
                    </Stack>
                </Center>
            </Card>
        );
    }

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            {data.device && (
                <Group mb="xs" gap="xs">
                    <IconBrandSpotifyFilled size={16} color="var(--mantine-color-green-6)" />
                    <Text size="xs" c="dimmed">
                        Playing on {data.device.name}
                    </Text>
                </Group>
            )}
            <Group align="flex-start" gap="md">
                <AlbumArtwork
                    src={data.albumArtworkUrl}
                    alt={`${data.track.name} album artwork`}
                    size={80}
                />
                <Stack flex={1} gap="sm">
                    <Group justify="space-between" align="flex-start">
                        <TrackInfo
                            title={data.track.name}
                            artists={data.track.artists}
                            className=""
                        />
                        {data.isPlaying ? (
                            <IconPlayerPlay size={20} color="var(--mantine-color-green-6)" />
                        ) : (
                            <IconPlayerPause size={20} color="var(--mantine-color-gray-6)" />
                        )}
                    </Group>
                    <ProgressBar
                        currentMs={progress}
                        totalMs={data.track.durationMs}
                        isPlaying={data.isPlaying}
                    />
                </Stack>
            </Group>
        </Card>
    );
} 