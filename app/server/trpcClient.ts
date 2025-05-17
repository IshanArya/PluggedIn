import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from './router';

export const trpc = createTRPCReact<AppRouter>();

export function getTrpcClient() {
  return trpc.createClient({
    links: [
      httpBatchLink({
        url: '/api',
        headers() {
          const headers = new Headers()
          headers.set('x-trpc-source', 'react')
          return headers
        }
      }),
    ],
  });
}
