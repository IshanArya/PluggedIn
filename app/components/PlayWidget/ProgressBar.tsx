import { Group, Progress, Text } from '@mantine/core';

interface ProgressBarProps {
    currentMs: number;
    totalMs: number;
    isPlaying?: boolean;
}

function formatTime(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function ProgressBar({ currentMs, totalMs, isPlaying = false }: ProgressBarProps) {
    const progressPercent = totalMs > 0 ? (currentMs / totalMs) * 100 : 0;
    const clampedProgress = Math.min(Math.max(progressPercent, 0), 100);

    return (
        <div data-testid="progress-bar">
            <Progress
                value={clampedProgress}
                size="sm"
                mb="xs"
                animated={isPlaying}
                color={isPlaying ? 'green' : 'gray'}
            />
            <Group justify="space-between">
                <Text size="xs" c="dimmed">
                    {formatTime(currentMs)}
                </Text>
                <Text size="xs" c="dimmed">
                    {formatTime(totalMs)}
                </Text>
            </Group>
        </div>
    );
} 