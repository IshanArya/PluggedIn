import { Box, Text } from '@mantine/core';

export function FooterContent() {
    return (
        <Box h="100%" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text size="sm" c="dimmed">
                © {new Date().getFullYear()} PluggedIn. All rights reserved.
            </Text>
        </Box>
    );
} 