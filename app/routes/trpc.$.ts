import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import type { Route } from './+types/trpc.$';
import { createContext } from '~/server/trpc';
import { appRouter } from '~/server/router';

const handleRequest = (args: Route.LoaderArgs | Route.ActionArgs) => {
  return fetchRequestHandler({
    endpoint: '/trpc',
    req: args.request,
    router: appRouter,
    createContext,
  });
};

export const loader = (args: Route.LoaderArgs) => handleRequest(args);

export const action = (args: Route.ActionArgs) => handleRequest(args);
