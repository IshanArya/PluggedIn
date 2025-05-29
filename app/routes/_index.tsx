import { Container, Stack } from '@mantine/core';
import { useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { CTASection } from '../components/CTASection';
import { FeaturesSection } from '../components/FeaturesSection';
import { HeroSection } from '../components/HeroSection';
import { PlayWidgetContainer } from '../components/PlayWidget';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { caller } from '../server/trpcServer';
import type { Route } from './+types/_index';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: 'PluggedIn - Connect Through Music' },
    { name: 'description', content: 'Share music with friends, sync listening experiences, and discover new songs through your social network on Spotify.' },
  ];
}

// Loader to check authentication state server-side
export async function loader(args: LoaderFunctionArgs) {
  const api = await caller(args);
  const { user } = await api.loader.user();

  return {
    isAuthenticated: Boolean(user),
    user,
  };
}

function LandingPageView() {
  return (
    <Stack gap={0}>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </Stack>
  );
}

function PlayWidgetView() {
  return (
    <Container size="sm" py="xl">
      <PlayWidgetContainer />
    </Container>
  );
}

export default function Home() {
  const { isAuthenticated } = useLoaderData<typeof loader>();

  if (isAuthenticated) {
    return <PlayWidgetView />;
  }

  return <LandingPageView />;
}
