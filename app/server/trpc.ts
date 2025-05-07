import { initTRPC } from '@trpc/server';
import { z } from 'zod';

// Context creation (expand as needed)
export async function createContext() {
  return {};
}
type Context = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.context<Context>().create();

// export const appRouter = t.router({
//     hello: t.procedure
//         .input(z.object({ name: z.string().optional() }))
//         .query(({ input }) => {
//             return { greeting: `Hello, ${input.name ?? 'world'}!` };
//         }),
// });

const publicProcedure = t.procedure;

export const p = {
  public: publicProcedure,
};
