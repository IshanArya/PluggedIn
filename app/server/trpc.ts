import { initTRPC, TRPCError } from '@trpc/server';
import { auth } from './auth';

// Context creation (expand as needed)
export async function createContext(req: Request) {
  console.log('>>> createContext', req);
  const authSession = await auth.api.getSession({
    headers: req.headers
  })
  const source = req.headers.get('x-trpc-source') ?? 'unknown'
  console.log('>>> tRPC Request from', source, 'by', authSession?.user.email)
  console.log('>>> authSession', authSession)


  return {
    user: authSession?.user,
  };
}
type Context = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "please login" });
  }
  return next();
});

export const createCallerFactory = t.createCallerFactory


const publicProcedure = t.procedure;
const authProcedure = publicProcedure.use(isAuthed);


export const p = {
  public: publicProcedure,
  auth: authProcedure,
};
