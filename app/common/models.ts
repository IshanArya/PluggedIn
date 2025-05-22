export type TrpcContext = {
    token: {
        accessToken: string | undefined;
        accessTokenExpiresAt: Date | undefined;
        scopes: string[];
        idToken: string | undefined;
    };
    [key: string]: any;
}

export type SocialToken = TrpcContext['token']