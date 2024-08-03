"use client"; // This line makes the component a Client Component

import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../../../../../../../components/Navbar'; // Adjust the path as necessary
import TournamentTree from '../../../../../../../components/TournamentTree'; // Adjust the path as necessary
import CommentsSection from '../../../../../../../components/CommentsSection'; // Adjust the path as necessary

const PostPage = () => {
    const params = useParams();
    const router = useRouter();
    const { id, game } = params;

    const [allPosts, setAllPosts] = useState({});
    const [post, setPost] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newTournamentSize, setNewTournamentSize] = useState(8);
    const [newPlayerNames, setNewPlayerNames] = useState([]);

    useEffect(() => {
        // Retrieve posts from localStorage or any other storage mechanism
        const storedPosts = JSON.parse(localStorage.getItem('allPosts')) || {};
        setAllPosts(storedPosts);

        // Find the post by id and game
        const forumPosts = storedPosts[game] || [];
        const foundPost = forumPosts.find(post => post.id.toString() === id);
        if (foundPost) {
            setPost(foundPost);
            setNewTournamentSize(foundPost.maxParticipants); // Set initial tournament size
            setNewPlayerNames(foundPost.playerNames || []); // Set initial player names
        }
    }, [id, game]);

    const handleJoinTournament = () => {
        if (post.participants < post.maxParticipants) {
            const updatedPost = { ...post, participants: post.participants + 1 };
            const updatedPosts = {
                ...allPosts,
                [game]: allPosts[game].map(p => (p.id === post.id ? updatedPost : p))
            };
            setAllPosts(updatedPosts);
            setPost(updatedPost);
            localStorage.setItem('allPosts', JSON.stringify(updatedPosts));
        }
    };

    const handleTournamentEdit = () => {
        const updatedPost = { ...post, maxParticipants: newTournamentSize, playerNames: newPlayerNames };
        const updatedPosts = {
            ...allPosts,
            [game]: allPosts[game].map(p => (p.id === post.id ? updatedPost : p))
        };
        setAllPosts(updatedPosts);
        setPost(updatedPost);
        localStorage.setItem('allPosts', JSON.stringify(updatedPosts));
        setIsEditing(false);
    };

    const handlePlayerNameChange = (index, value) => {
        const updatedNames = [...newPlayerNames];
        updatedNames[index] = value;
        setNewPlayerNames(updatedNames);
    };

    const handleDeleteTournament = () => {
        if (window.confirm("Are you sure you want to delete this tournament?")) {
            const updatedPosts = {
                ...allPosts,
                [game]: allPosts[game].filter(p => p.id !== post.id)
            };
            setAllPosts(updatedPosts);
            localStorage.setItem('allPosts', JSON.stringify(updatedPosts));
            router.push(`/pages/forums/${game}`);
        }
    };

    if (!post) {
        return (
            <div>
                <Head>
                    <title>Post Not Found</title>
                </Head>
                <Navbar />
                <div style={{ padding: '2rem' }}>
                    <h1>Post Not Found</h1>
                    <p>The post you are looking for does not exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Head>
                <title>{post.title}</title>
            </Head>

            <Navbar />

            <div style={{ padding: '2rem' }}>
                <h1>Welcome to {post.title} post</h1>
                <p>{post.content}</p>
                <p>Participants: {post.participants}/{post.maxParticipants}</p>
                <button onClick={handleJoinTournament} disabled={post.participants >= post.maxParticipants}>
                    Join Tournament
                </button>
                {isEditing ? (
                    <div>
                        <label>
                            Tournament Size:
                            <select
                                value={newTournamentSize}
                                onChange={(e) => setNewTournamentSize(parseInt(e.target.value))}
                            >
                                <option value={4}>4</option>
                                <option value={8}>8</option>
                                <option value={16}>16</option>
                                <option value={32}>32</option>
                            </select>
                        </label>
                        <button onClick={handleTournamentEdit}>Save</button>
                    </div>
                ) : (
                    <button onClick={() => setIsEditing(true)}>Edit Tournament</button>
                )}
                <TournamentTree
                    initialParticipants={post.maxParticipants || 8}
                    playerNames={newPlayerNames.length ? newPlayerNames : post.playerNames || []}
                    isEditing={isEditing}
                    onPlayerNameChange={handlePlayerNameChange}
                />
                <button onClick={handleDeleteTournament} style={{ marginTop: '1rem', backgroundColor: 'red', color: 'white' }}>
                    Delete Tournament
                </button>
                <CommentsSection />
            </div>
        </div>
    );
};

export default PostPage;
