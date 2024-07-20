import Head from 'next/head';
import styles from './About.module.css';

export default function About() {
    return (
        <div className={styles.container}>
            <Head>
                <title>About</title>
            </Head>

            <div>Welcome to TournaME website of team 10 in SCE!
                <br/> Team members are :
                <br/> Daniel Nekludov, Almog Bar, Gal Deri, Ran Deri, Hodaya Dahan, Shir Sabag, Efrat Jamil
                <br/> Check out the GitHub @ github.com/Player1IL/TournaME-Client
                <br/>
            </div>

        </div>
    );
}