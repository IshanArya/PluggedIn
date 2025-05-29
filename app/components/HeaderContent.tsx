import { Box, Group, Text } from '@mantine/core';
import { IconMusic } from '@tabler/icons-react';
import { LoginButton } from './LoginButton';

export function HeaderContent({ user }: { user: { name: string; email: string } | undefined }) {
    return (
        <Box h="100%" px="md" style={{ display: 'flex', alignItems: 'center' }}>
            <Group gap="xs">
                <IconMusic size={24} stroke={1.5} color="var(--mantine-color-green-6)" />
                <Text size="xl" fw={700} c="green">
                    PluggedIn
                </Text>
            </Group>

            <Box ml="auto">
                {user ? (
                    <Text fw={500}>Welcome, {user.name}</Text>
                ) : (
                        <LoginButton />
                )}
            </Box>
        </Box>
    );
} 