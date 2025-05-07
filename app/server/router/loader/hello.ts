import { z } from 'zod';
import { p } from '~/server/trpc';

export const hello = p.public
  .input(z.object({ name: z.string().optional() }))
  .query(({ input }) => {
    return { greeting: `Hello, ${input.name ?? 'world'}!` };
  });
