import { initTRPC, TRPCError } from '@trpc/server';
import type { TrpcContext } from '~/common/models';
import { auth } from './auth';

// Context creation (expand as needed)
export async function createContext(req: Request): Promise<TrpcContext> {
  console.log('>>> createContext', req);
  const authSession = await auth.api.getSession({
    headers: req.headers
  })
  let authToken = undefined;
  if (authSession) {
    authToken = await auth.api.getAccessToken({
      body: {
        providerId: 'spotify',
      },
      headers: req.headers
    })
  }
  const source = req.headers.get('x-trpc-source') ?? 'unknown'
  console.log('>>> tRPC Request from', source, 'by', authSession?.user.email)


  return {
    session: authSession,
    token: authToken,
  };
}
type Context = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(({ ctx, next }: { ctx: TrpcContext; next: any }) => {
  if (!ctx.session) {
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
