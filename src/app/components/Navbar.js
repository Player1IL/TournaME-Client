"use client"; // This line makes the component a Client Component

import React, { useContext } from 'react';
import Link from 'next/link';
import { UserContext } from 'src/app/UserContext'; // Ensure the correct path

const Navbar = () => {

    const { user, logoutUser } = useContext(UserContext);

    return (
        <header className="header">
            <div className="container">
                <div className="header__content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className="header__logo">
                        <Link href="/">
                            <img src="/img/logo.png" alt="Logo" style={{ width: '150px', height: 'auto' }} />
                        </Link>
                    </div>
                    <nav className="header__menu mobile-menu">
                        <ul style={{ display: 'flex', alignItems: 'center' }}>
                            <li><Link href="/">Homepage</Link></li>
                            {user ? (
                                <>
                                    <li><Link href="/pages/personal">Personal Area</Link></li>
                                    <li><button onClick={logoutUser}>Logout</button></li>
                                </>
                            ) : (
                                <>
                                    <li><Link href="/pages/signup">Sign Up</Link></li>
                                    <li><Link href="/pages/signin">Login</Link></li>
                                </>
                            )}
                            <li><Link href="/pages/about">About</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
