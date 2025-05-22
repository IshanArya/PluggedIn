import { p } from '~/server/trpc';

export const user = p.auth.query(async ({ ctx }) => {
    if (ctx.session && ctx.session.user) {
        const { name, email } = ctx.session.user;
        return { user: { name, email } };
    }
    return { user: null };
}); 