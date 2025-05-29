import { Avatar, Box, Card, Container, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { IconQuote } from '@tabler/icons-react';

interface TestimonialProps {
    name: string;
    role: string;
    content: string;
    avatar: string;
}

function TestimonialCard({ name, role, content, avatar }: TestimonialProps) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="md">
                <IconQuote size={24} color="var(--mantine-color-green-6)" />
                <Text c="dimmed" lh={1.6} style={{ fontStyle: 'italic' }}>
                    "{content}"
                </Text>
                <Group gap="sm" mt="md">
                    <Avatar src={avatar} size="sm" radius="xl" />
                    <Box>
                        <Text fw={600} size="sm">{name}</Text>
                        <Text c="dimmed" size="xs">{role}</Text>
                    </Box>
                </Group>
            </Stack>
        </Card>
    );
}

export function TestimonialsSection() {
    const testimonials = [
        {
            name: 'Alex Chen',
            role: 'Music Enthusiast',
            content: 'PluggedIn has completely changed how I discover music. Seeing what my friends are listening to in real-time is amazing!',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
        },
        {
            name: 'Sarah Johnson',
            role: 'Spotify Power User',
            content: 'The sync feature is incredible for music parties. Everyone stays perfectly in tune, no matter where they are.',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
        },
        {
            name: 'Mike Rodriguez',
            role: 'DJ & Producer',
            content: 'Being able to instantly add my friends\' discoveries to my library has expanded my musical horizons like never before.',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'
        }
    ];

    return (
        <Container size="lg" py="xl">
            <Stack align="center" gap="xl">
                <Title order={2} size="2.5rem" fw={700} ta="center">
                    What Music Lovers Say
                </Title>

                <Text size="lg" c="dimmed" ta="center" maw={600}>
                    Join thousands of music enthusiasts who are already connecting through PluggedIn.
                </Text>

                <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg" mt="lg">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} {...testimonial} />
                    ))}
                </SimpleGrid>
            </Stack>
        </Container>
    );
} 