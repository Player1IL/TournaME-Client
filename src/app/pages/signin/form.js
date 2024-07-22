'use client'

import styles from "./page.module.css";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";
import {useState} from "react";

export default function Form() {

    //const [resName, setResName] = useState(null);

    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        /*
        Change fetch accordingly:
            Local: http://localhost:3124/signin
            Deploy: https://tourname.onrender.com/signin
            Dev: https://tourname-server-side-dev.onrender.com/signin
        */
        const response = await fetch('https://tourname-server-side-dev.onrender.com/signin', {
            method: 'POST',
            body: JSON.stringify({
                email: formData.get("email"),
                password: formData.get("password")
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response.status === 400 && alert("Incorrect Email or password");
        response.status === 200 && router.push("../");

        console.log(response);
    };
    const handleRedirectCreate = (e) => {
        e.preventDefault();
        router.push('./signup/')
    }
    const handleRedirectHome = (e) => {
        e.preventDefault();
        router.push('../')
    }
    return (
        <div>
            <div className={styles.container}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <h2>Log in</h2>

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required/>

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required/>

                    <button type="submit">Log in</button>
                    <button onClick={handleRedirectCreate}>No account? Create one now!</button>
                    <button onClick={handleRedirectHome}>Home page</button>
                </form>
            </div>
        </div>
    )
}
