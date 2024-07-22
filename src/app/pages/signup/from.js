'use client'

import { useState } from "react";
import styles from "./page.module.css";
import {useRouter} from "next/navigation";
import {validateDob, validateEmail, validatePasswords} from "../../utils/validation";

export default function Form() {
    const router = useRouter();
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        dob: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const email = formData.get("email")
        const username= formData.get("username")
        const password= formData.get("password")
        const passwordRepeat= formData.get("repeatPassword")
        const dob = formData.get("dob")

        let hasError = false;
        const newErrors = { email: "", password: "", dob: "" };

        if (!validateEmail(email)) {
            newErrors.email = "Invalid email format";
            hasError = true;
            alert(newErrors.email)
        }
        if (!validatePasswords(password, passwordRepeat)) {
            newErrors.password = "Passwords do not match";
            hasError = true;
            alert(newErrors.password)
        }
        if (!validateDob(dob)) {
            newErrors.dob = "You must be 13 or above to register";
            hasError = true;
            alert(newErrors.dob)
        }
        setErrors(newErrors);

        if (!hasError) {
            /*
            Change fetch accordingly:
                Local: http://localhost:3124/signup
                Deploy: https://tourname.onrender.com/signup
            */
            const response = await fetch("https://tourname.onrender.com/signup", {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    username: username,
                    password: password,
                    dob: dob,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            response.status === 400 && alert("Email or Username already exists!");
            response.status === 201 && router.push("./signin");

            console.log(response);
        }
    }
    const handleRedirect = (e)  =>{
        e.preventDefault();
        router.push('./signin/')
    }
    const handleRedirectHome = (e)  =>{
        e.preventDefault();
        router.push('../')
    }
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form} id="signup-form">
                <h2>Sign Up</h2>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email"
                       pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                       required/>

                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username"
                       required/>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password"
                       pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                       title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                       required/>

                <label htmlFor="repeatPassword">Repeat Password:</label>
                <input type="password" id="repeatPassword" name="repeatPassword"
                       required/>

                <label htmlFor="dob">Date of Birth:</label>
                <input type="date" id="dob" name="dob"
                       required/>

                <button type="submit">Create account</button>
                <button onClick={handleRedirect}>Have account? Log in</button>
                <button onClick={handleRedirectHome}>Home page</button>
            </form>
        </div>
    )
}