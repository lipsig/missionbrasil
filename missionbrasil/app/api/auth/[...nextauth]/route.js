import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";


const authOption = {
    secret: process.env.SECRET,
    providers: [    
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    pages: {    
        signIn: "/login",
    },
};

const handler = NextAuth(authOption);

export {handler as GET, handler as POST};