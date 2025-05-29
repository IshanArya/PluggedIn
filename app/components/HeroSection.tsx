import { Container, Group, Stack, Text, Title } from '@mantine/core';
import { IconHeart, IconMusic, IconUsers } from '@tabler/icons-react';
import { LoginButton } from './LoginButton';

export function HeroSection() {
    return (
        <Container size="lg" py="xl">
            <Stack align="center" gap="xl" ta="center">
                <Group gap="sm" justify="center">
                    <IconMusic size={32} stroke={1.5} />
                    <Title order={1} size="3rem" fw={900} c="green">
                        PluggedIn
                    </Title>
                    <IconMusic size={32} stroke={1.5} />
                </Group>

                <Title order={2} size="2rem" fw={700} maw={800}>
                    Connect Through Music with Your Friends
                </Title>

                <Text size="xl" c="dimmed" maw={600} lh={1.6}>
                    Share what you're listening to, discover your friends' music, add their recently played songs to your library, and sync your listening experience in real-time.
                </Text>

                <Group gap="lg" justify="center" mt="lg">
                    <IconUsers size={24} stroke={1.5} color="var(--mantine-color-blue-6)" />
                    <Text size="lg" fw={500}>
                        Share & Discover
                    </Text>
                    <IconHeart size={24} stroke={1.5} color="var(--mantine-color-red-6)" />
                    <Text size="lg" fw={500}>
                        Sync & Connect
                    </Text>
                </Group>

                <LoginButton callbackURL="/dashboard" />
            </Stack>
        </Container>
    );
} 