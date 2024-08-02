// src/app/pages/forums/[game].js
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../../components/Navbar'; // Adjust the path as necessary

const GamePage = () => {
    const router = useRouter();
    const { game } = router.query;
    const gameName = game ? game.replace(/-/g, ' ') : '';

    return (
        <div>
            <Head>
                <title>{gameName}</title>
            </Head>

            <Navbar />

            <div>
                <h1>{gameName}</h1>
                <p>Welcome to the {gameName} forum page.</p>
            </div>
        </div>
    );
};

export default GamePage;
