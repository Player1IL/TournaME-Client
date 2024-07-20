// pages/index.js
import Head from 'next/head';
import Navbar from './components/Navbar';
import styles from './components/Home.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>My Homepage</title>
                <meta name="description" content="Welcome to my homepage" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to TournaME
                </h1>
                <p className={styles.description}>
                    Create and Join tournaments of your favorite games and interact with millions of users
                </p>
            </main>
        </div>
    );
}
