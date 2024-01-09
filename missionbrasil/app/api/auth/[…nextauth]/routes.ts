import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

//validate environment variables.
if (!clientId || !clientSecret) {
    throw new Error('Missing required environment variables GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET');
}

export const authOptions = {
    providers: [    
        GoogleProvider({
            clientId,
            clientSecret
        }),
    ],
    pages: {    
        signIn: "/auth/signin",
    },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};