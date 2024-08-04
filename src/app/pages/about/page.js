// src/app/pages/about.js
import Head from 'next/head';
import Navbar from 'src/app/components/Navbar'; // Adjust the path as necessary
import styles from './About.module.css'; // You can create a CSS module for the About page if needed

const About = () => {
    return (
        <div>
            <Head>
                <title>About</title>
            </Head>

            <Navbar />
            <div>Welcome to TournaME website of team 10 in SCE!
                <br/> Team members are :
                <br/> Daniel Nekludov, Almog Bar, Gal Deri, Ran Deri, Hodaya Dahan, Shir Sabag, Efrat Jamil
                <br/> Check out the GitHub @ github.com/Player1IL/TournaME-Client
                <br/>
            </div>

            <div className={styles.container}>
                <h1>About Us</h1>
                <p>Team members are :</p>
                <p>Daniel Nekludov, Almog Bar, Gal Deri, Ran Deri, Hodaya Dahan, Shir Sabag, Efrat Jamil</p>
                <p>Check out the GitHub @ github.com/Player1IL/TournaME-Client</p>
            </div>
        </div>
    );
};

export default About;
