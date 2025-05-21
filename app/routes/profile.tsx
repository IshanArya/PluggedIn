import { useEffect, useState } from 'react';
import { Container, Card, Avatar, Text, Loader, Alert, Title, Group, CopyButton, Button } from '@mantine/core';
import type { Route } from './+types/profile';
import { trpc } from '~/client/trpcClient';

interface SpotifyProfile {
    display_name: string;
    images: { url: string }[];
    email: string;
    country: string;
    uri: string;
}

export async function loader(loaderArgs: Route.LoaderArgs) {
    // Use the server-side tRPC caller to fetch the user
    console.log('>>> loader', loaderArgs);
    // const api = await caller(loaderArgs);
    // const user = await api.loader.greeting();
    // return user;
    return null;
}

export default function Profile({ loaderData: user }: Route.ComponentProps & {
    loaderData: {
        id: string;
        name?: string | null;
        email: string;
        image?: string | null;
        country?: string | null;
        uri?: string | null;
    }
}) {
    if (!user) {
        return (
            <Container size="xs" py="xl">
                <Alert color="red" title="Profile Error">No user data found. Please log in.</Alert>
            </Container>
        );
    }
    return (
        <Container size="xs" py="xl">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group mb="md">
                    <Avatar src={user.image ?? undefined} size={80} radius="xl" />
                    <Title order={3}>{user.name || user.email}</Title>
                </Group>
                <Text>Email: {user.email}</Text>
                {user.country && <Text>Country: {user.country}</Text>}
                {user.uri && (
                    <Group mt="md">
                        <Text>Spotify URI:</Text>
                        <CopyButton value={user.uri}>
                            {({ copied, copy }) => (
                                <Button size="xs" color={copied ? 'teal' : 'blue'} onClick={copy}>
                                    {copied ? 'Copied' : 'Copy'}
                                </Button>
                            )}
                        </CopyButton>
                    </Group>
                )}
            </Card>
        </Container>
    );
} 