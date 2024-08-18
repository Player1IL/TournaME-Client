'use client';

import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { useState } from 'react';
import { IP } from '../../../app_const';
import Navbar from 'src/app/components/Navbar'; // Import the Navbar component
import 'src/styles/style.css';
import {UserContext} from "src/app/UserContext";

export default function Form() {
    const router = useRouter();
    const [isSignedIn, setIsSignedIn] = useState(false); // State to track signed-in status
    const { loginUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await fetch(IP + '/signin', {
            method: 'POST',
            body: JSON.stringify({
                email: formData.get('email'),
                password: formData.get('password'),
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 400) {
            alert('Incorrect Email or password');
            setIsSignedIn(false);
        } else if (response.status === 200) {
            const userData = await response.json(); // Assuming the response contains user data
            loginUser(userData);
            router.push('../');
        }
    };

    const handleRedirectCreate = (e) => {
        e.preventDefault();
        router.push('./signup/');
    };

    const handleRedirectHome = (e) => {
        e.preventDefault();
        router.push('../');
    };

    return (
        <div>
            <Navbar isSignedIn={isSignedIn} /> {/* Pass the isSignedIn state to Navbar */}

            <section className="normal-breadcrumb set-bg" style={{ backgroundImage: 'url(/img/normal-breadcrumb.jpg)' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="normal__breadcrumb__text">
                                <h2>Login</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="login spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="login__form">
                                <h3>Login</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="input__item">
                                        <input type="email" placeholder="Email address" name="email" required />
                                        <span className="icon_mail"></span>
                                    </div>
                                    <div className="input__item">
                                        <input type="password" placeholder="Password" name="password" required />
                                        <span className="icon_lock"></span>
                                    </div>
                                    <button type="submit" className="site-btn">Login Now</button>
                                </form>
                            </div>
                        </div>
                        <div className="login__register login__register--inline">
                            <h3 style={{ marginLeft: '113px', marginTop: '60px' }}>Don’t Have An Account?</h3>
                            <a style={{ marginLeft: '115px' }} href="#" onClick={handleRedirectCreate} className="primary-btn">Register Now</a>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
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
                            <p>&copy; {new Date().getFullYear()} SCE.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
