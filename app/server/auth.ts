import { betterAuth } from "better-auth";
import { dbPool } from "./constants";

console.log('>>> SPOTIFY_CLIENT_ID', process.env.VITE_SPOTIFY_CLIENT_ID)
console.log('>>> SPOTIFY_CLIENT_SECRET', process.env.SPOTIFY_CLIENT_SECRET)

export const auth = betterAuth({
    database: dbPool,
    advanced: {
        cookiePrefix: 'pluggedin_auth_'
    },
    trustedOrigins: [
        'http://localhost',
        'http://127.0.0.1:5173'
    ],
    socialProviders: {
        spotify: {
            clientId: process.env.VITE_SPOTIFY_CLIENT_ID as string,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
            redirectURI: 'http://127.0.0.1:5173/api/auth/callback/spotify'
        }
    },
    session: {
        updateAge: 60 * 60 * 24, // 1 day
        freshAge: 60 * 5 // 5 minutes
    }
})
