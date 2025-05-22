
export function FooterContent() {
    return (
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#888' }}>
            © {new Date().getFullYear()} PluggedIn. All rights reserved.
        </div>
    );
} 