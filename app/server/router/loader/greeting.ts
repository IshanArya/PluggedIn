
import { p } from '~/server/trpc';

export const greeting = p.auth
    .query(async ({ ctx }) => {
        return ctx
    });
