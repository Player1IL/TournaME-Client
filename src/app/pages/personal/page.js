// src/app/pages/personal/page.js
"use client";

import { useState } from 'react';
import Head from 'next/head';
import Navbar from 'src/app/components/Navbar'; // Adjust the path as necessary
import styles from './Personal.module.css';
import AccountInfo from './settings/account-info';
import ChangePassword from './settings/change-password';
import Followers from './settings/followers';
import Activity from './settings/activity';
import FriendList from './settings/friend-list';
import DeleteAccount from './settings/delete-account';
//import Navbar from '../../components/Navbar';

const Personal = () => {
    const [selectedSection, setSelectedSection] = useState('account-info');

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
                            <a
                                className={styles.sidebarLink}
                                onClick={() => setSelectedSection('change-password')}
                            >
                                Change Password
                            </a>
                        </li>
                        <li>
                            <a
                                className={styles.sidebarLink}
                                onClick={() => setSelectedSection('account-info')}
                            >
                                Account Info
                            </a>
                        </li>
                        <li>
                            <a
                                className={styles.sidebarLink}
                                onClick={() => setSelectedSection('followers')}
                            >
                                Followers
                            </a>
                        </li>
                        <li>
                            <a
                                className={styles.sidebarLink}
                                onClick={() => setSelectedSection('activity')}
                            >
                                Activity
                            </a>
                        </li>
                        <li>
                            <a
                                className={styles.sidebarLink}
                                onClick={() => setSelectedSection('friend-list')}
                            >
                                Friend List
                            </a>
                        </li>
                        <li>
                            <a
                                className={styles.sidebarLink}
                                onClick={() => setSelectedSection('delete-account')}
                            >
                                Delete Account
                            </a>
                        </li>
                    </ul>
                </nav>

                <main className={styles.mainContent}>
                    {selectedSection === 'change-password' && <ChangePassword />}
                    {selectedSection === 'account-info' && <AccountInfo />}
                    {selectedSection === 'followers' && <Followers />}
                    {selectedSection === 'activity' && <Activity />}
                    {selectedSection === 'friend-list' && <FriendList />}
                    {selectedSection === 'delete-account' && <DeleteAccount />}
                </main>
            </div>
        </div>
    );
};

export default Personal;
