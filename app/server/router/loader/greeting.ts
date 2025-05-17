
import { z } from 'zod';
import { p } from '~/server/trpc';

export const greeting = p.auth
    .query(async ({ ctx }) => {
        console.log('>>> greeting', ctx.user)
        return ctx.user
    });
