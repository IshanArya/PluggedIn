import { LoginButton } from './LoginButton';

export function HeaderContent({ user }: { user: { name: string; email: string } | undefined }) {
    return (
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', paddingLeft: 16, fontWeight: 600 }}>
            PluggedIn
            <div style={{ marginLeft: 'auto', paddingRight: 16 }}>
                {user ? (
                    <span>Welcome, {user.name}</span>
                ) : (
                        <LoginButton />
                )}
            </div>
        </div>
    );
} 