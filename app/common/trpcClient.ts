import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import { appRouter, type AppRouter } from '~/server/router'
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { createCallerFactory, createContext } from '~/server/trpc';

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

const createTRPCContext = (ctx: FetchCreateContextFnOptions) => {
    ctx.req.headers.set('x-trpc-source', 'server-loader')
    return createContext(ctx)
}

const createCaller = createCallerFactory(appRouter)
export const caller = async (loaderArgs: LoaderFunctionArgs) =>
    createCaller(await createTRPCContext(loaderArgs))
