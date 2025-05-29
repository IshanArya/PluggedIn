import { Card, Container, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconPlaylist, IconRefresh, IconShare, IconUserPlus } from '@tabler/icons-react';

interface FeatureProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

function FeatureCard({ icon, title, description }: FeatureProps) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack align="center" ta="center" gap="md">
                <ThemeIcon size="xl" radius="md" color="green">
                    {icon}
                </ThemeIcon>
                <Title order={3} size="h4" fw={600}>
                    {title}
                </Title>
                <Text c="dimmed" lh={1.6}>
                    {description}
                </Text>
            </Stack>
        </Card>
    );
}

export function FeaturesSection() {
    const features = [
        {
            icon: <IconShare size={24} />,
            title: 'Share Your Music',
            description: 'Let your friends see what you\'re currently listening to and discover new music through your shared tastes.'
        },
        {
            icon: <IconPlaylist size={24} />,
            title: 'Add Friends\' Songs',
            description: 'Easily add recently played songs from your friends directly to your Spotify library with one click.'
        },
        {
            icon: <IconRefresh size={24} />,
            title: 'Sync Listening',
            description: 'Listen to music together in real-time with friends, staying perfectly synchronized across devices.'
        },
        {
            icon: <IconUserPlus size={24} />,
            title: 'Connect with Friends',
            description: 'Build your music network by connecting with friends and discovering their musical journey.'
        }
    ];

    return (
        <Container size="lg" py="xl">
            <Stack align="center" gap="xl">
                <Title order={2} size="2.5rem" fw={700} ta="center">
                    How PluggedIn Works
                </Title>

                <Text size="lg" c="dimmed" ta="center" maw={600}>
                    Discover, share, and sync your music experience with friends through our powerful Spotify integration.
                </Text>

                <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg" mt="lg">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </SimpleGrid>
            </Stack>
        </Container>
    );
} 