import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { createContext } from '~/server/trpc';
import { createCallerFactory } from '~/server/trpc';
import { appRouter } from '~/server/router';
import type { LoaderFunctionArgs } from 'react-router';

const createTRPCContext = (loaderArgs: LoaderFunctionArgs) => {
    // Clone headers and set x-trpc-source
    const headers = new Headers(loaderArgs.request.headers);
    headers.set('x-trpc-source', 'server-loader');
    // Create a new Request with the updated headers
    const req = new Request(loaderArgs.request, { headers });
    const resHeaders = new Headers();
    // Minimal TRPCRequestInfo object
    const info = {
        accept: null,
        type: 'unknown' as const,
        isBatchCall: false,
        calls: [],
        connectionParams: null,
        signal: req.signal,
        url: null,
    };
    return createContext({ req, resHeaders, info });
};

const createCaller = createCallerFactory(appRouter);
export const caller = async (loaderArgs: LoaderFunctionArgs) =>
    createCaller(await createTRPCContext(loaderArgs));