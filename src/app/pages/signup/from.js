'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { validateDob, validateEmail, validatePasswords } from "../../utils/validation";
import { IP } from "../../../app_const";
import 'src/styles/style.css';

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

        const email = formData.get("email");
        const username = formData.get("username");
        const password = formData.get("password");
        const passwordRepeat = formData.get("repeatPassword");
        const dob = formData.get("dob");

        let hasError = false;
        const newErrors = { email: "", password: "", dob: "" };

        if (!validateEmail(email)) {
            newErrors.email = "Invalid email format";
            hasError = true;
            alert(newErrors.email);
        }
        if (!validatePasswords(password, passwordRepeat)) {
            newErrors.password = "Passwords do not match";
            hasError = true;
            alert(newErrors.password);
        }
        if (!validateDob(dob)) {
            newErrors.dob = "You must be 13 or above to register";
            hasError = true;
            alert(newErrors.dob);
        }
        setErrors(newErrors);

        if (!hasError) {
            const response = await fetch(IP + '/signup', {
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
    };

    // Adding the JavaScript to set the background image using data-setbg
    useEffect(() => {
        document.querySelectorAll('.set-bg').forEach(element => {
            const bg = element.getAttribute('data-setbg');
            element.style.backgroundImage = `url(${bg})`;
        });
    }, []);

    return (
        <div>
            {/* Header Section Begin */}
            <header className="header">
                <div className="container">
                    <div className="header__content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div className="header__logo">
                            <a href="/">
                                <img src="/img/logo.png" alt="Logo" style={{ width: '150px', height: 'auto' }} />
                            </a>
                        </div>
                        <div className="header__nav">
                            <nav className="header__menu mobile-menu">
                                <ul style={{display: 'flex', alignItems: 'center'}}>
                                    <li><a href="/">Homepage</a></li>
                                    <li><a href="./signup">Sign Up</a></li>
                                    <li><a href="./signin">Login</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
            {/* Header End */}

            {/* Normal Breadcrumb Begin */}
            <section className="normal-breadcrumb set-bg" data-setbg="/img/normal-breadcrumb.jpg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="normal__breadcrumb__text">
                                <h2>Sign Up</h2>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Normal Breadcrumb End */}

            {/* Signup Section Begin */}
            <section className="signup spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="login__form">
                                <h3>Sign Up</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="input__item">
                                        <input type="email" id="email" name="email" pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/" placeholder="Email address" required />
                                        <span className="icon_mail"></span>
                                    </div>
                                    <div className="input__item">
                                        <input type="text" id="username" name="username" placeholder="Your Name" required />
                                        <span className="icon_profile"></span>
                                    </div>
                                    <div className="input__item">
                                        <input type="password" id="password" name="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder="Password" required />
                                        <span className="icon_lock"></span>
                                    </div>
                                    <div className="input__item">
                                        <input type="password" id="repeatPassword" name="repeatPassword" placeholder="Repeat Password" required />
                                        <span className="icon_lock"></span>
                                    </div>
                                    <div className="input__item">
                                        <input type="date" id="dob" name="dob" required />
                                    </div>
                                    <button type="submit" className="site-btn">Create Account</button>
                                </form>
                                <h5>Already have an account? <a href="./signin" onClick={(e) => { e.preventDefault(); router.push('./signin'); }}>Log In!</a></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Signup Section End */}

            {/* Footer Section Begin */}
            <footer className="footer">
                <div className="page-up">
                    <a href="#" id="scrollToTopButton"><span className="arrow_carrot-up"></span></a>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="footer__logo">
                                <img src="/img/logo.png" alt="Logo" style={{ width: '150px', height: 'auto' }} />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="footer__nav">
                                <ul>
                                    <li className="active"><a href="./index.html">Homepage</a></li>
                                    <li><a href="./categories.html">Categories</a></li>
                                    <li><a href="./blog.html">Our Blog</a></li>
                                    <li><a href="#">Contacts</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <p>&copy;<script>document.write(new Date().getFullYear());</script> SCE. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>
            {/* Footer Section End */}
        </div>
    );
}
