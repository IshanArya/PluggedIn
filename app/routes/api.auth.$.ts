import { auth } from '~/server/auth'
import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router"

export async function loader({ request }: LoaderFunctionArgs) {
    console.log('>>> loader auth', request)
    return auth.handler(request)
}

export async function action({ request }: ActionFunctionArgs) {
    console.log('>>> action auth', request)
    return auth.handler(request)
}
