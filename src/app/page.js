// pages/index.js
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import styles from '../../components/Home.module.css';

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
                    Welcome to My TournaME Homepage
                </h1>
                <p className={styles.description}>
                    This is the Homepage of our project, Hope you have a fun time browsing
                </p>
            </main>
        </div>
    );
}
