import { betterAuth } from "better-auth";
import { dbPool } from "./constants";

export const auth = betterAuth({
    database: dbPool,
    socialProviders: {
        spotify: {
            clientId: process.env.VITE_SPOTIFY_CLIENT_ID as string,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
        }
    }
})
