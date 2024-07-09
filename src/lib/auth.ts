//Responsible for all the authentication we do in the app
//Recheck

import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { NextAuthOptions } from "next-auth";
import { db } from "./db";
import GoogleProvider from "next-auth/providers/google"
import { fetchRedis } from "@/helpers/redis";

function getGoogleCredentials() {
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET

    if(!clientId || clientId.length === 0) {
        throw new Error('Missing GOOGLE_CLIENT_ID')
    }
    if(!clientSecret || clientSecret.length === 0) {
        throw new Error('Missing GOOGLE_CLIENT_SECRET')
    }

    return {clientId, clientSecret}
}

/* MEANING OF ALL THE COMPONENTS(CHATGPT) :-

adapter: Specifies Upstash Redis as the storage adapter for session data.

session: Configures session strategy to use JSON Web Tokens (JWT).

pages: Specifies a custom sign-in page at /login.

providers: Sets up Google as an authentication provider, using credentials fetched by getGoogleCredentials.

callbacks: Customizes the handling of JWT and session data.

jwt: When a user signs in, fetches their information from the database. 
     If the user doesn't exist in the database, it sets the token's ID to the user's ID. 
     Otherwise, it populates the token with the user's information from the database.

session: Populates the session object with user information from the token.

redirect: Specifies that after successful authentication, users should be redirected to the /dashboard page.
*/

export const authOptions: NextAuthOptions = {
    adapter: UpstashRedisAdapter(db),
    session: {
        strategy: 'jwt'
    },
    pages:{
        signIn: '/login'
    },
    providers: [
        GoogleProvider({
            clientId: getGoogleCredentials().clientId,
            clientSecret: getGoogleCredentials().clientSecret,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            const dbUserResult = (await fetchRedis('get', `user:${token.id}`)) as
                | string
                | null
      
            if (!dbUserResult) {
                if (user) {
                    token.id = user!.id
                }
        
                return token
            }
      
            const dbUser = JSON.parse(dbUserResult) as User
      
            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
            }
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.picture
            }
      
            return session
        },
        redirect() {
            return '/dashboard'
        },
    },
}