import { Button, Container, Title } from '@mantine/core';

const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const SPOTIFY_REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const SPOTIFY_SCOPES = [
    'user-read-private',
    'user-read-email',
].join(' ');

function getSpotifyAuthUrl() {
    const params = new URLSearchParams({
        client_id: SPOTIFY_CLIENT_ID,
        response_type: 'code',
        redirect_uri: SPOTIFY_REDIRECT_URI,
        scope: SPOTIFY_SCOPES,
    });
    return `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export default function Login() {
    return (
        <Container size="xs" py="xl">
            <Title order={2} align="center" mb="lg">Login with Spotify</Title>
            <Button fullWidth size="md" component="a" href={getSpotifyAuthUrl()}>
                Connect with Spotify
            </Button>
        </Container>
    );
} 