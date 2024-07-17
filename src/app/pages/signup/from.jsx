'use client'

import styles from "@/app/pages/signup/page.module.css";

export default function Form() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify({
                email: formData.get("email"),
                username: formData.get("username"),
                password: formData.get("password"),
                passwordRepeat: formData.get("repeatPassword"),
                dob: formData.get("dob"),
            }),
        });
        console.log(response);
    }
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form} id="signup-form">
                <h2>Sign Up</h2>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required/>

                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required/>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password"
                       pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                       title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                       required/>

                <label htmlFor="repeatPassword">Repeat Password:</label>
                <input type="password" id="repeatPassword" name="repeatPassword" required/>

                <label htmlFor="dob">Date of Birth:</label>
                <input type="date" id="dob" name="dob" required/>

                <button type="submit">Sign In</button>
            </form>
        </div>
    )
}