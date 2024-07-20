import Head from 'next/head';
import Navbar from '../../components/Navbar';

export default function Personal() {
    return (
        <div>
            <Head>
                <title>Personal</title>
            </Head>

            <Navbar />

            <main>
                <h1>Personal Page</h1>
                <p>This is the personal page.</p>
            </main>
        </div>
    );
}