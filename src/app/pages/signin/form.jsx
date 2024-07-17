'use client'

import styles from "@/app/pages/signup/page.module.css";

export default function Form() {
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
    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <h2>Log in</h2>

                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required/>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required/>

                <button type="submit">Log in</button>
            </form>
        </div>
    )
}