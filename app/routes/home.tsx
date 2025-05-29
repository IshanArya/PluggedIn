import { Stack } from '@mantine/core';
import { CTASection } from '../components/CTASection';
import { FeaturesSection } from '../components/FeaturesSection';
import { HeroSection } from '../components/HeroSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'PluggedIn - Connect Through Music' },
    { name: 'description', content: 'Share music with friends, sync listening experiences, and discover new songs through your social network on Spotify.' },
  ];
}

export default function Home() {
  return (
    <Stack gap={0}>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </Stack>
  );
}
