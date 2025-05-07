import { t } from '../trpc';
import { hello } from './loader/hello';
import { action as spotifyToken } from './action/spotifyToken';
import { loader as spotifyMe } from './loader/spotifyMe';

export const appRouter = t.router({
  loader: t.router({
    hello,
    spotifyMe,
  }),
  action: t.router({
    spotifyToken,
  }),
});

export type AppRouter = typeof appRouter;
