import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from './trpc';

export const trpc = createTRPCReact<AppRouter>();

export function getTrpcClient() {
    return trpc.createClient({
        links: [
            httpBatchLink({
                url: '/trpc',
            }),
        ],
    });
} 