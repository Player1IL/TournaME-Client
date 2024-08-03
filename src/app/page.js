import Head from 'next/head';
import Navbar from '../../components/Navbar'; // Adjust the path as necessary
import Link from 'next/link';
import styles from './Home.module.css'; // Adjust the path as necessary

const Home = () => {
    const boxes = [
        { title: 'VALORANT', tags: ['FPS', 'Shooter'] },
        { title: 'League of Legends', tags: ['RPG', 'Strategy'] },
        { title: 'Fortnite', tags: ['Shooter', 'RPG'] },
        { title: 'Counter-Strike', tags: ['FPS', 'Shooter'] },
        { title: 'PUBG: BATTLEGROUNDS', tags: ['FPS', 'Shooter'] },
    ];

    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>

            <Navbar />

            <div className={styles.container}>
                <h1>Home</h1>
                <div className={styles.grid}>
                    {boxes.map((box, index) => (
                        <Link key={index} href={`pages/forums/${box.title.replace(/\s+/g, '-').toLowerCase()}`} legacyBehavior>
                            <div className={styles.box}>
                                <h2 className={styles.boxTitle}>{box.title}</h2>
                                <p className={styles.boxViewers}>{box.viewers}</p>
                                <div className={styles.tags}>
                                    {box.tags.map((tag, idx) => (
                                        <span key={idx} className={styles.tag}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
