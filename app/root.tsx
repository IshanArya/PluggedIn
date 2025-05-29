import { AppShell, createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  type LoaderFunctionArgs,
} from 'react-router';

import type { Route } from './+types/root';
import './app.css';
import { getTrpcClient, trpc } from './client/trpcClient';
import { FooterContent } from './components/FooterContent';
import { HeaderContent } from './components/HeaderContent';
import { caller } from './server/trpcServer';

const theme = createTheme({
  primaryColor: 'green',
  fontFamily: 'Inter, sans-serif',
});

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

// Loader to fetch user info from the tRPC endpoint (SSR)
export async function loader(args: LoaderFunctionArgs) {
  const api = await caller(args);
  const { user } = await api.loader.user();
  console.log(">>> user:", user);
  return { user };
}

type User = { name: string; email: string } | null;

export function Layout() {
  const [queryClient] = React.useState(() => new QueryClient());
  const [trpcClient] = React.useState(() => getTrpcClient());
  const data = useLoaderData<typeof loader>();
  const user = data == null ? undefined : data.user;
  // console.log("user:", user);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Notifications />
          <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
              <AppShell header={{ height: 60 }} footer={{ height: 48 }} padding={0}>
                <AppShell.Header>
                  <HeaderContent user={user} />
                </AppShell.Header>
                <AppShell.Main>
                  <Outlet />
                </AppShell.Main>
                <AppShell.Footer>
                  <FooterContent />
                </AppShell.Footer>
              </AppShell>
            </QueryClientProvider>
          </trpc.Provider>
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
