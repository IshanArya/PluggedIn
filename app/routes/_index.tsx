import { Stack } from '@mantine/core';
import { redirect, type LoaderFunctionArgs } from 'react-router';
import { CTASection } from '../components/CTASection';
import { FeaturesSection } from '../components/FeaturesSection';
import { HeroSection } from '../components/HeroSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { caller } from '../server/trpcServer';
import type { Route } from './+types/_index';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: 'PluggedIn - Connect Through Music' },
    { name: 'description', content: 'Share music with friends, sync listening experiences, and discover new songs through your social network on Spotify.' },
  ];
}

// Loader to check authentication state and redirect if authenticated
export async function loader(args: LoaderFunctionArgs) {
  const api = await caller(args);
  const { user } = await api.loader.user();

  // Redirect authenticated users to dashboard
  if (user) {
    throw redirect('/dashboard');
  }

  return {
    isAuthenticated: false,
    user: null,
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

export default function Home() {
  return <LandingPageView />;
}
