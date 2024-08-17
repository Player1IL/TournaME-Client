import React from 'react';
import Link from 'next/link';

const Navbar = ({ isSignedIn = false }) => { // Default isSignedIn to false (guest)
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
                        <ul style={{display: 'flex', alignItems: 'center'}}>
                            <li><Link href="/">Homepage</Link></li>

                            {isSignedIn ? (
                                <>
                                    <li><Link href="/pages/personal">Personal Area</Link></li>
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
