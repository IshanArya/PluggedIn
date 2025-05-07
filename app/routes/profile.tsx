import { useEffect, useState } from 'react';
import { Container, Card, Avatar, Text, Loader, Alert, Title, Group, CopyButton, Button } from '@mantine/core';

interface SpotifyProfile {
    display_name: string;
    images: { url: string }[];
    email: string;
    country: string;
    uri: string;
}

export default function Profile() {
    const [profile, setProfile] = useState<SpotifyProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('spotify_access_token');
        if (!token) {
            setError('No access token found. Please log in.');
            setLoading(false);
            return;
        }
        fetch('/api/spotify/me', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(async (res) => {
                if (!res.ok) throw new Error('Failed to fetch profile');
                return res.json();
            })
            .then((data) => {
                setProfile(data);
                setLoading(false);
            })
            .catch((e) => {
                setError(e.message || 'Unknown error');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Container size="xs" py="xl" style={{ display: 'flex', justifyContent: 'center' }}>
                <Loader size="lg" />
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
    if (!profile) return null;
    return (
        <Container size="xs" py="xl">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group position="apart" mb="md">
                    <Avatar src={profile.images?.[0]?.url} size={80} radius="xl" />
                    <Title order={3}>{profile.display_name}</Title>
                </Group>
                <Text>Email: {profile.email}</Text>
                <Text>Country: {profile.country}</Text>
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
            </Card>
        </Container>
    );
} 