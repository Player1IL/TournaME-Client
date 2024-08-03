"use client"; // This line makes the component a Client Component

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../../../../../components/Navbar'; // Adjust the path as necessary
import styles from './GamePage.module.css'; // Import the CSS module
import Link from 'next/link';

const GamePage = () => {
    const params = useParams();
    const { game } = params;

    const [allPosts, setAllPosts] = useState({});
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [isAddingPost, setIsAddingPost] = useState(false);
    const [tournamentSize, setTournamentSize] = useState(8); // Default tournament size

    useEffect(() => {
        // Load posts from localStorage
        const storedPosts = JSON.parse(localStorage.getItem('allPosts')) || {};
        setAllPosts(storedPosts);
    }, []);

    const posts = allPosts[game] || [];

    const handleAddPost = () => {
        const newPost = {
            id: posts.length + 1,
            title: newPostTitle,
            content: newPostContent,
            participants: 0,
            maxParticipants: tournamentSize,
        };
        const updatedPosts = { ...allPosts, [game]: [...posts, newPost] };
        setAllPosts(updatedPosts);
        localStorage.setItem('allPosts', JSON.stringify(updatedPosts));
        setNewPostTitle('');
        setNewPostContent('');
        setIsAddingPost(false);
    };

    const handleTournamentSizeChange = (event) => {
        const newSize = parseInt(event.target.value);
        setTournamentSize(newSize);

        // Update maxParticipants for all posts in the current forum
        const updatedPosts = {
            ...allPosts,
            [game]: posts.map(post => ({ ...post, maxParticipants: newSize }))
        };
        setAllPosts(updatedPosts);
        localStorage.setItem('allPosts', JSON.stringify(updatedPosts));
    };

    return (
        <div>
            <Head>
                <title>{game} Forum</title>
            </Head>
            <Navbar />
            <div className={styles.container}>
                <h1>Welcome to the {game} Tournament Forum</h1>
                <button className={styles.newPostButton} onClick={() => setIsAddingPost(!isAddingPost)}>
                    {isAddingPost ? 'Cancel' : 'New Post'}
                </button>
                {isAddingPost && (
                    <div className={styles.newPost}>
                        <h2>Add a New Post</h2>
                        <input
                            type="text"
                            value={newPostTitle}
                            onChange={(e) => setNewPostTitle(e.target.value)}
                            placeholder="Post Title"
                        />
                        <textarea
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                            placeholder="Post Content"
                        />
                        <label>
                            Tournament Size:
                            <select
                                value={tournamentSize}
                                onChange={handleTournamentSizeChange}
                            >
                                <option value={4}>4</option>
                                <option value={8}>8</option>
                                <option value={16}>16</option>
                                <option value={32}>32</option>
                            </select>
                        </label>
                        <button onClick={handleAddPost}>Add Post</button>
                    </div>
                )}
                <div className={styles.posts}>
                    <h2>Posts</h2>
                    {posts.map(post => (
                        <div key={post.id} className={styles.post}>
                            <Link href={`/pages/forums/${game}/posts/${post.id}`} legacyBehavior>
                                <a className={styles.postLink}>
                                    <h3>{post.title}</h3>
                                    <p>{post.content}</p>
                                    <p>Participants: {post.participants}/{post.maxParticipants}</p>
                                </a>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GamePage;
