import { t } from '../trpc';
import { hello } from './loader/hello';

export const appRouter = t.router({
  loader: t.router({
    hello,
  }),
  action: t.router({}),
});

export type AppRouter = typeof appRouter;
