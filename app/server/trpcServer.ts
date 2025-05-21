import { createContext } from '~/server/trpc';
import { createCallerFactory } from '~/server/trpc';
import { appRouter } from '~/server/router';
import type { LoaderFunctionArgs } from 'react-router';

const createTRPCContext = (loaderArgs: LoaderFunctionArgs) => {
    // Clone headers and set x-trpc-source
    loaderArgs.request.headers.set('x-trpc-source', 'server-loader');
    // Create a new Request with the updated headers
    return createContext(loaderArgs.request);
};

const createCaller = createCallerFactory(appRouter);
export const caller = async (loaderArgs: LoaderFunctionArgs) =>
    createCaller(await createTRPCContext(loaderArgs));