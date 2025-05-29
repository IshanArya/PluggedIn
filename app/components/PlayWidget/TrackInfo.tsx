import { Stack, Text } from '@mantine/core';

interface TrackInfoProps {
    title: string;
    artists: string[];
    className?: string;
}

export function TrackInfo({ title, artists, className }: TrackInfoProps) {
    const artistText = artists.length > 0 ? artists.join(', ') : 'Unknown Artist';

    return (
        <Stack gap="xs" className={className} data-testid="track-info">
            <Text
                size="md"
                fw={600}
                lineClamp={1}
                title={title}
            >
                {title}
            </Text>
            <Text
                size="sm"
                c="dimmed"
                lineClamp={1}
                title={artistText}
            >
                {artistText}
            </Text>
        </Stack>
    );
} 