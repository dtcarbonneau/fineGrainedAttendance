import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prismadb"
//import EmailProvider from "next-auth/providers/email"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  adapter: PrismaAdapter(prisma),
  providers: [
    /* EmailProvider({
         server: process.env.EMAIL_SERVER,
         from: process.env.EMAIL_FROM,
       }),
    // Temporarily removing the Apple provider from the demo site as the
    // callback URL for it needs updating due to Vercel changing domains
    }),
    */
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        wellKnown: 'https://accounts.google.com/.well-known/openid-configuration',
        params: {
          //url: 'https://accounts.google.com/o/oauth2/v2/auth',
          scope: 'https://www.googleapis.com/auth/userinfo.profile \
                        https://www.googleapis.com/auth/classroom.coursework.students \
                        https://www.googleapis.com/auth/classroom.courses \
                        https://www.googleapis.com/auth/classroom.rosters \
                        https://www.googleapis.com/auth/spreadsheets \
                        https://www.googleapis.com/auth/gmail.modify \
                        https://www.googleapis.com/auth/classroom.profile.emails \
                        https://www.googleapis.com/auth/classroom.guardianlinks.students',
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }

    }),
  ],
  //session: {
  // Choose how you want to save the user session.
  // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
  // If you use an `adapter` however, we default it to `"database"` instead.
  // You can still force a JWT session by explicitly defining `"jwt"`.
  // When using `"database"`, the session cookie will only contain a `sessionToken` value,
  // which is used to look up the session in the database.
  // strategy: "database",

  // Seconds - How long until an idle session expires and is no longer valid.
  //  maxAge: 30 * 24 * 60 * 60, // 30 days

  // Seconds - Throttle how frequently to write to database to extend a session.
  // Use it to limit write operations. Set to 0 to always update the database.
  // Note: This option is ignored if using JSON Web Tokens
  //  updateAge: 0 //24 * 60 * 60, // 24 hours

  // The session token is usually either a random UUID or string, however if you
  // need a more customized session token string, you can define your own generate function.
  //generateSessionToken: () => {
  //  return randomUUID?.() ?? randomBytes(32).toString("hex")
  //}
  //},
  callbacks: {
    //  async jwt({ token, user, account, profile, isNewUser }) {
    //    token.userRole = "admin"
    // },
    //},
    async session({ session, token, user }) {
      const getToken = await prisma.account.findFirst({
        where: {
          userId: user.id,
        },
      });
      let accessToken = null;
      if (getToken) {
        accessToken = getToken.access_token;
      }

      session.user.token = accessToken;
      console.log(session)
      return session;
    }
  }
}

export default NextAuth(authOptions)