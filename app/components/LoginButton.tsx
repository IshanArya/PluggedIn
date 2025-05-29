import { Button } from '@mantine/core';
import { authClient } from '../client/authClient';

// For future extensibility, accept a provider prop (default: spotify)
type LoginButtonProps = {
    provider?: 'spotify';
    callbackURL?: string;
};

export function LoginButton({ provider = 'spotify', callbackURL = '/dashboard' }: LoginButtonProps) {
    const handleLogin = async () => {
        await authClient.signIn.social({
            provider,
            callbackURL,
        });
    };

    return (
        <Button onClick={handleLogin} variant="filled" color="green">
            LogIn with Spotify
        </Button>
    );
} 