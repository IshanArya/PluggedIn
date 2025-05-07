import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Loader, Alert } from '@mantine/core';

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
                const res = await fetch('/api/spotify/token', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code }),
                });
                if (!res.ok) throw new Error('Failed to exchange code for token');
                const data = await res.json();
                localStorage.setItem('spotify_access_token', data.access_token);
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