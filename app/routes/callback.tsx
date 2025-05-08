import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Loader, Alert } from '@mantine/core';

const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const SPOTIFY_REDIRECT_URI = "http://127.0.0.1:5173/callback";

export async function getAccessToken(clientId: string, code: string): Promise<string> {
    const verifier = localStorage.getItem("verifier");
    console.log('verifier', verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", SPOTIFY_REDIRECT_URI);
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

export default function Callback() {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const url = new URL(window.location.href);
        const code = url.searchParams.get('code');
        if (!code) {
            setError('No code found in callback URL.');
            return;
        }
        (async () => {
            try {
                const accessToken = await getAccessToken(SPOTIFY_CLIENT_ID, code);
                localStorage.setItem('spotify_access_token', accessToken);
                navigate('/profile');
            } catch (e: any) {
                setError(e.message || 'Unknown error');
            }
        })();
    }, [navigate]);

    if (error) {
        return (
            <Container size="xs" py="xl">
                <Alert color="red" title="Authentication Error">{error}</Alert>
            </Container>
        );
    }
    return (
        <Container size="xs" py="xl" style={{ display: 'flex', justifyContent: 'center' }}>
            <Loader size="lg" />
        </Container>
    );
} 