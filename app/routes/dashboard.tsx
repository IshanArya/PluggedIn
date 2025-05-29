import { Container } from '@mantine/core';
import { redirect, useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { PlayWidgetContainer } from '../components/PlayWidget';
import { caller } from '../server/trpcServer';
import type { Route } from './+types/dashboard';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: 'Dashboard - PluggedIn' },
        { name: 'description', content: 'Your personal music dashboard - see what you\'re currently playing on Spotify.' },
    ];
}

// Loader to check authentication and protect the dashboard route
export async function loader(args: LoaderFunctionArgs) {
    const api = await caller(args);
    const { user } = await api.loader.user();

    // Redirect unauthenticated users to home page
    if (!user) {
        throw redirect('/');
    }

    return {
        user,
    };
}

export default function Dashboard() {
    const { user } = useLoaderData<typeof loader>();

    return (
        <Container size="sm" py="xl">
            <PlayWidgetContainer />
        </Container>
    );
} 