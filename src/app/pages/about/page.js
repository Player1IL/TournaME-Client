import Head from 'next/head';
import styles from './About.module.css';

export default function About() {
    return (
        <div className={styles.container}>
            <Head>
                <title>About</title>
            </Head>

            <div>Welcome to TournaME project of team 10 in SCE! <br/> The team members are :   </div>

        </div>
    );
}