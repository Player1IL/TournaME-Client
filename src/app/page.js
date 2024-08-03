import Head from 'next/head';
import Navbar from '../../components/Navbar'; // Adjust the path as necessary
import Link from 'next/link';
import styles from './Home.module.css'; // Adjust the path as necessary

const Home = () => {
    const boxes = [
        { title: 'Just Chatting', viewers: '169K viewers', tags: ['IRL'] },
        { title: 'VALORANT', viewers: '300K viewers', tags: ['FPS', 'Shooter'] },
        { title: 'League of Legends', viewers: '94K viewers', tags: ['RPG', 'Strategy'] },
        { title: 'Marvel Rivals', viewers: '8.2K viewers', tags: ['Shooter', 'Strategy'] },
        { title: 'Grand Theft Auto V', viewers: '85K viewers', tags: ['FPS', 'Shooter'] },
        { title: 'Fortnite', viewers: '30.2K viewers', tags: ['Shooter', 'RPG'] },
        { title: 'Counter-Strike', viewers: '66.1K viewers', tags: ['FPS', 'Shooter'] },
        { title: 'PUBG: BATTLEGROUNDS', viewers: '12.7K viewers', tags: ['FPS', 'Shooter'] },
        { title: 'Minecraft', viewers: '15.6K viewers', tags: ['Simulation'] },
        { title: 'Path of Exile', viewers: '', tags: [] },
        { title: 'ELDEN RING', viewers: '', tags: [] },
        { title: 'Rust', viewers: '', tags: [] },
        { title: 'Call of Duty: Warzone', viewers: '', tags: [] },
        { title: 'Overwatch 2', viewers: '', tags: [] },
        { title: 'Dota 2', viewers: '', tags: [] },
        { title: 'Tom Clancy\'s Rainbow Six Siege', viewers: '', tags: [] },
        { title: 'ROBLOX', viewers: '', tags: [] },
        { title: 'Dead by Daylight', viewers: '', tags: [] }
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
