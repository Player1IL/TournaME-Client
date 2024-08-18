"use client"; // This line makes the component a Client Component

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from 'src/app/components/Navbar.js'; // Adjust the path as necessary
import styles from './GamePage.module.css'; // Import the CSS module
import Link from 'next/link';
import { IP } from '../../../../app_const';

const GamePage = () => {
    const params = useParams();
    const { game } = params;

    const [allPosts, setAllPosts] = useState({});
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [isAddingPost, setIsAddingPost] = useState(false);
    const [tournamentSize, setTournamentSize] = useState(8); // Default tournament size
    const [newPostStatus, setNewPostStatus] = useState('Open'); // Default status
    const [filter, setFilter] = useState('date'); // Default filter is 'date'
    const [filterValue, setFilterValue] = useState(''); // State for filter value

        // useEffect(() => {
        //     // Load posts from localStorage
        //     const storedPosts = JSON.parse(localStorage.getItem('allPosts')) || {};
        //     setAllPosts(storedPosts);
        // }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            try {

                const response = await fetch(IP + '/tournament/get/by-game',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                        name: game
                    }),
                    headers: {
                    'Content-Type': 'application/json',
                }});
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setAllPosts({ [game]: data });
                }
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
        };

        fetchPosts();
    }, [game]);

    const posts = allPosts[game] || [];

    const generateRandomUsername = () => {
        const adjectives = ['Cool', 'Smart', 'Fast', 'Brave', 'Mighty'];
        const nouns = ['Lion', 'Tiger', 'Eagle', 'Shark', 'Dragon'];
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        return `${adjective}${noun}${Math.floor(Math.random() * 100)}`;
    };

    const handleAddPost = () => {
        const newPost = {
            id: posts.length + 1,
            title: newPostTitle,
            content: newPostContent,
            participants: 0,
            maxParticipants: tournamentSize,
            status: newPostStatus,
            date: new Date().toLocaleDateString(), // Add the date here
            user: generateRandomUsername() // Add the random username
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

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        setFilterValue(''); // Reset filter value when filter type changes
    };

    const handleFilterValueChange = (event) => {
        setFilterValue(event.target.value);
    };

    const getFilteredPosts = () => {
        let filtered = posts;

        if (filter && filterValue) {
            if (filter === 'status') {
                filtered = posts.filter(post => post.status === filterValue);
            }
        }

        if (filter === 'date') {
            filtered.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first
        }

        return filtered;
    };

    const filteredPosts = getFilteredPosts();

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
                        <label>
                            Status:
                            <select
                                value={newPostStatus}
                                onChange={(e) => setNewPostStatus(e.target.value)}
                            >
                                <option value="Open">Open</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </label>
                        <button onClick={handleAddPost}>Add Post</button>
                    </div>
                )}
                <div className={styles.filter}>
                    <label>
                        Filter By:
                        <select value={filter} onChange={handleFilterChange}>
                            <option value="">None</option>
                            <option value="status">Status</option>
                            <option value="date">Date</option>
                        </select>
                    </label>
                    {filter && filter === 'status' && (
                        <select value={filterValue} onChange={handleFilterValueChange}>
                            <option value="">Select Status</option>
                            <option value="Open">Open</option>
                            <option value="Closed">Closed</option>
                        </select>
                    )}
                </div>
                <div className={styles.posts}>
                    <h2>Posts</h2>
                    {filteredPosts.map(post => (
                        <div key={post.id} className={styles.post}>
                            <Link href={`/pages/forums/${game}/posts/${post.id}`} legacyBehavior>
                                <a className={styles.postLink}>
                                    <h3>{post.tournament_name}</h3>
                                    <p>{post.tournament_description}</p>
                                    <p>Participants: {post.maxParticipants}</p>
                                    <p>Status: {post.status}</p>
                                    <p>Date: {post.createAt}</p>
                                    <p>User: {post.owner}</p> {/* Display User */}
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
