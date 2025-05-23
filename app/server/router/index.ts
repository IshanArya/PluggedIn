import { t } from '../trpc';
import { greeting } from './loader/greeting';
import { hello } from './loader/hello';
import { user } from './loader/user';

export const appRouter = t.router({
  loader: t.router({
    hello,
    greeting,
    user,
    spotify: t.router({

    }),
  }),
  action: t.router({
  }),
});

export type AppRouter = typeof appRouter;
