import { NextResponse } from "next/server";
import util from "util";
import { query } from "@/lib/db";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

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
                if (user.password) {
                    return user.password === credentials.password ? { admin_ID: user.admin_ID, ...user } : null;
                }
            }
        })
    ],
    secret: process.env.SECRET_KEY,
    callbacks: {
          async session({ session, token, user }) {
            if (token) {
              session = token;
            }
            return session
      
          }, 
          async jwt({ token, user}) {
            if (user) {
              token.id = user.admin_ID;
            }
            return token
          }
    }
}

const handler = NextAuth(authOption);
export {handler as GET , handler as POST}
