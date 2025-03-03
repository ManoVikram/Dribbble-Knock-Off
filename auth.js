import PostgresAdapter from "@auth/pg-adapter";
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PostgresAdapter(pool),
    providers: [Google],
    session: {
        strategy: "database",
    },
    callbacks: {
        // async jwt({ token, user, account }) {
        //     if (user) {
        //       token.id = user.id;
        //     }
        //     return token;
        //   },
          async session({ session, token }) {
            // session.user.id = token.id;
            return session;
          },
    },
    secret: process.env.AUTH_SECRET,
})