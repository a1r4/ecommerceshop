import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import {connectMongoDB} from '../../../../libs/models/MongoConnect';
import User from '../../../../libs/models/User';
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.USER_CLIENT_ID!,
            clientSecret: process.env.USER_CLIENT_SECRET!
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    
});

export {handler as GET, handler as POST};