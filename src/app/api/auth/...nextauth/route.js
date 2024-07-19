import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {compare} from "bcrypt";
import {signIn} from "next-auth/react";
//import {useRouter} from "next/navigation";

const handler = NextAuth({
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: "./pages/signin"
    },
    provider: [
        CredentialsProvider({
        credentials: {
            username: {},
            password: {},
        },
        async authorize(credentials, req) {

            const response = await fetch('http://localhost:3124/login', {
                method: 'POST',
                body: JSON.stringify({username : credentials?.username, password : credentials?.password}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("response: " + JSON.stringify(response));
            return null
        }
    })]
})

export {handler as GET, handler as POST};