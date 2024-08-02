// components/Navbar.js
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navLinks}>
                <li>
                    <Link href="/" className={styles.navLink}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/pages/signin" className={styles.navLink}>
                        Sign-in
                    </Link>
                </li>
                <li>
                    <Link href="/pages/about" className={styles.navLink}>
                        About
                    </Link>
                </li>
                <li>
                    <Link href="/pages/personal" className={styles.navLink}>
                        Personal Area
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
