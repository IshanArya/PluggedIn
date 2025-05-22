import { Alert, Avatar, Button, Card, Container, CopyButton, Group, Text, Title } from '@mantine/core';
import { useSpotifyProfile } from '~/hooks/spotifyHooks';
import { caller } from '~/server/trpcServer';
import type { Route } from './+types/profile';


export async function loader(loaderArgs: Route.LoaderArgs) {
    // Use the server-side tRPC caller to fetch the user
    console.log('>>> loader', loaderArgs);
    const api = await caller(loaderArgs);
    const session = await api.loader.greeting();
    return session;
}

export default function Profile({ loaderData: session }: Route.ComponentProps & any) {
    console.log('>>> session', session);
    const { profile, loading, error } = useSpotifyProfile(session?.token);

    if (loading) {
        return (
            <Container size="xs" py="xl" style={{ display: 'flex', justifyContent: 'center' }}>
                <Text>Loading...</Text>
            </Container>
        );
    }
    if (error) {
        return (
            <Container size="xs" py="xl">
                <Alert color="red" title="Profile Error">{error}</Alert>
            </Container>
        );
    }
    if (!profile) {
        return null;
    }
    return (
        <Container size="xs" py="xl">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group mb="md">
                    <Avatar src={profile.image ?? undefined} size={80} radius="xl" />
                    <Title order={3}>{profile.name || profile.email}</Title>
                </Group>
                <Text>Email: {profile.email}</Text>
                {profile.country && <Text>Country: {profile.country}</Text>}
                {profile.uri && (
                    <Group mt="md">
                        <Text>Spotify URI:</Text>
                        <CopyButton value={profile.uri}>
                            {({ copied, copy }) => (
                                <Button size="xs" color={copied ? 'teal' : 'blue'} onClick={copy}>
                                    {copied ? 'Copied' : 'Copy'}
                                </Button>
                            )}
                        </CopyButton>
                    </Group>
                )}
            </Card>
        </Container>
    );
} 