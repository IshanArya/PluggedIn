import { Box, Container, Stack, Text, Title } from '@mantine/core';
import { IconBrandSpotify } from '@tabler/icons-react';
import { LoginButton } from './LoginButton';

export function CTASection() {
    return (
        <Box bg="var(--mantine-color-green-0)" py="xl">
            <Container size="lg">
                <Stack align="center" gap="xl" ta="center">
                    <IconBrandSpotify size={48} stroke={1.5} color="var(--mantine-color-green-6)" />

                    <Title order={2} size="2rem" fw={700}>
                        Ready to Get PluggedIn?
                    </Title>

                    <Text size="lg" c="dimmed" maw={500} lh={1.6}>
                        Connect your Spotify account and start sharing your music journey with friends today.
                    </Text>

                    <LoginButton callbackURL="/dashboard" />

                    <Text size="sm" c="dimmed">
                        Free to use • Secure Spotify integration • No spam
                    </Text>
                </Stack>
            </Container>
        </Box>
    );
} 