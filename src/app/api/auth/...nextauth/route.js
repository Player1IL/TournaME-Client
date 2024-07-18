import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {compare} from "bcrypt";
//import {useRouter} from "next/navigation";

const handler = NextAuth({
    provider: [CredentialsProvider({
        session: {
            strategy: 'jwt',
        },
        pages: {
          signIn: "./pages/signin"
        },
        credentials: {
            username: {},
            password: {},
        },
        async authorize(credentials, req) {
            //const router = useRouter();

            // ^/*/^ - To be changed
            const res = await fetch("/your/endpoint", {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { "Content-Type": "application/json" }
            })
            const user = await res.json()

            // ^/*/^ If no error and we have user data, return it
            if (res.ok && user) {
                return user
            }
            // Return null if user data could not be retrieved
            return null
        }
    })]
})

export {handler as GET, handler as POST};