import { t } from '../trpc';
import { greeting } from './loader/greeting';
import { hello } from './loader/hello';

export const appRouter = t.router({
  loader: t.router({
    hello,
    greeting,
  }),
  action: t.router({
  }),
});

export type AppRouter = typeof appRouter;
