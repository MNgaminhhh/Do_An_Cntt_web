import { NextResponse } from "next/server";
import util from "util";
import { query } from "@/lib/db";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOption = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }
                let user = await query({ query: `SELECT * FROM admin WHERE username = ?`, values: [credentials.username] });
                user = user[0];
                if (!user) {
                    return null;
                }
                if (await bcrypt.compare(credentials.password, user.password)) {
                    return user;
                }
                return null;
                }
            }) 
    ],
    secret: 'hhhh'
}

const handler = NextAuth(authOption);
export {handler as GET , handler as POST}
