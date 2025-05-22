import { LoginButton } from './LoginButton';

export function HeaderContent() {
    return (
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', paddingLeft: 16, fontWeight: 600 }}>
            PluggedIn
            <div style={{ marginLeft: 'auto', paddingRight: 16 }}>
                <LoginButton />
            </div>
        </div>
    );
} 