import { type LoaderFunctionArgs } from 'react-router'
import { appRouter } from '~/server/router'
import { createCallerFactory, createContext } from '~/server/trpc'

const createTRPCContext = (opts: { headers: Headers }) => {
    const headers = new Headers(opts.headers)
    headers.set('x-trpc-source', 'server-loader')
    return createContext({
        headers
    })
}

const createCaller = createCallerFactory(appRouter)
export const caller = async (loaderArgs: LoaderFunctionArgs) =>
    createCaller(await createTRPCContext({ headers: loaderArgs.request.headers }))
