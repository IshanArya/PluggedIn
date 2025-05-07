import type { Route } from './+types/home';
import { Welcome } from '../welcome/welcome';
import { trpc } from '../server/trpcClient';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  const { data, isLoading } = trpc.loader.hello.useQuery({ name: 'PluggedIn' });
  return (
    <div>
      <Welcome />
      <div className="mt-4">{isLoading ? 'Loading greeting...' : data?.greeting}</div>
    </div>
  );
}
