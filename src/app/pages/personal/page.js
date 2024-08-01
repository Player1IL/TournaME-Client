// src/app/pages/personal/personal.js
import Head from 'next/head';
import Navbar from '../../../../components/Navbar';
import styles from './Personal.module.css';
import Link from 'next/link';

const Personal = ({ children }) => {
    return (
        <div>
            <Head>
                <title>Personal Area</title>
            </Head>

            <Navbar />

            <div className={styles.container}>
                <nav className={styles.sidebar}>
                    <ul className={styles.sidebarLinks}>
                        <li>
                            <Link href="/personal/settings/change-password" className={styles.sidebarLink}>
                                Change Password
                            </Link>
                        </li>
                        <li>
                            <Link href="/personal/settings/account-info" className={styles.sidebarLink}>
                                Account Info
                            </Link>
                        </li>
                        {/* Add more links as needed */}
                    </ul>
                </nav>

                <main className={styles.mainContent}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Personal;
