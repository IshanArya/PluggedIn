export type TrpcContext = {
    session: {
        session: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            expiresAt: Date;
            token: string;
            ipAddress?: string | null | undefined | undefined;
            userAgent?: string | null | undefined | undefined;
        } | null,
        user: {
            id: string;
            name: string;
            email: string;
            emailVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
            image?: string | null | undefined | undefined;
        } | null,
    } | null,
    token?: {
        accessToken: string | undefined;
        accessTokenExpiresAt: Date | undefined;
        scopes: string[];
        idToken: string | undefined;
    };
    [key: string]: any;
}

export type SocialToken = TrpcContext['token']

export type SpotifyCurrentPlayingState = {
    track?: {
        id: string;
        name: string;
        artists: string[];
        durationMs: number;
    };
    albumArtworkUrl?: string;
    isPlaying: boolean;
    progressMs?: number;
    device?: {
        name: string;
        type: string;
    };
};