'use client'

import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import {signIn} from "next-auth/react";

export default function Form() {
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await signIn('credentials', {
            username: formData.get("username"),
            password: formData.get("password"),
            redirect: false
        });
        console.log(response);
    };
    const handleRedirectCreate = (e)  =>{
        e.preventDefault();
        router.push('./signup/')
    }
    const handleRedirectHome = (e)  =>{
        e.preventDefault();
        router.push('../')
    }
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2>Log in</h2>

                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required/>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required/>

                <button type="submit">Log in</button>
                <button onClick={handleRedirectCreate}>No account? Create one now!</button>
                <button onClick={handleRedirectHome}>Home page</button>
            </form>
        </div>
    )
}