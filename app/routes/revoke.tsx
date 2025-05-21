import { authClient } from '~/client/authClient';

export async function loader() {
    await authClient.revokeSessions();
    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
}
