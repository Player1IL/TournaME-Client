import Head from 'next/head';
import Link from 'next/link';

import styles from './Home.module.css';
import 'src/styles/style.css';
import Navbar from 'src/app/components/Navbar';

import React from "react";

const Home = () => {
    const boxes = [
        { title: 'VALORANT', tags: ['FPS', 'Shooter'], img: '/img/games/valorant.jpg' },
        { title: 'League of Legends', tags: ['RPG', 'Strategy'], img: '/img/games/lig.jpg' },
        { title: 'Fortnite', tags: ['Shooter', 'RPG'], img: '/img/games/firtnite.jpg' },
        { title: 'Counter-Strike', tags: ['FPS', 'Shooter'], img: '/img/games/cs.jpg' },
        { title: 'PUBG: BATTLEGROUNDS', tags: ['FPS', 'Shooter'], img: '/img/games/pubg.jpg' },
        { title: 'Dead By Daylight', tags: ['Horror', 'Co-op'], img: '/img/games/Dead_by_Daylight.jpg' },
        { title: 'Apex Legends', tags: ['Active', 'Shooter'], img: '/img/games/apex.jpg' },
        { title: 'Dota 2', tags: ['Strategy', 'MOBA'], img: '/img/games/dota2.jpg' },
        { title: 'Elden Ring', tags: ['RPG', 'Adventure'], img: '/img/games/elden.jpg' },
    ];

    return (
        <div>
            <Head>
                <title>Home</title>
                <link rel="stylesheet" href="/styles/bootstrap.min.css" type="text/css" />
                <link rel="stylesheet" href="/styles/font-awesome.min.css" type="text/css" />
                <link rel="stylesheet" href="/styles/elegant-icons.css" type="text/css" />
                <link rel="stylesheet" href="/styles/plyr.css" type="text/css" />
                <link rel="stylesheet" href="/styles/nice-select.css" type="text/css" />
                <link rel="stylesheet" href="/styles/owl.carousel.min.css" type="text/css" />
                <link rel="stylesheet" href="/styles/slicknav.min.css" type="text/css" />
                <link rel="stylesheet" href="/styles/style.css" type="text/css" />
            </Head>

            <Navbar />

            <section className="hero">
                <div
                    className="hero__items"
                    style={{
                        backgroundImage: `url('/img/normal-breadcrumb.jpg')`,
                    }}
                >
                    <div className="container">
                        <div className="hero__text">
                            <a href="#" className="hero__button">
                                <span>Compete Now</span>
                                <i className="fa fa-angle-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </section>


            <div className={styles.container}>
                <h1>Home</h1>
                <div className={styles.gridContainer}>
                    {boxes.map((box, index) => (
                        <Link key={index} href={`/pages/forums/${box.title.replace(/\s+/g, '-').toLowerCase()}`}
                              legacyBehavior>
                            <a className={styles.gameBox}>
                                <img src={box.img} alt={box.title} className={styles.gameImage}/>
                                <h3>{box.title}</h3>
                                <div className={styles.tags}>
                                    {box.tags.map((tag, idx) => (
                                        <span key={idx} className={styles.tag}>{tag}</span>
                                    ))}
                                </div>
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
