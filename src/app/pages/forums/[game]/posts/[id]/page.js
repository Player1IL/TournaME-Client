"use client"; // This line makes the component a Client Component

import { useParams, useRouter } from 'next/navigation';
import { UserContext } from 'src/app/UserContext';
import React, {useState, useEffect, useContext} from 'react';
import Head from 'next/head';
import Navbar from 'src/app/components/Navbar'; // Adjust the path as necessary
import TournamentTree from 'src/app/components/TournamentTree'; // Adjust the path as necessary
import CommentsSection from 'src/app/components/CommentsSection'; // Adjust the path as necessary
import styles from './page.module.css'; // Import CSS module

const PostPage = () => {
    const params = useParams();
    const router = useRouter();
    const { id, game } = params;
    const { user } = useContext(UserContext);

    const [allPosts, setAllPosts] = useState({});
    const [post, setPost] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showJoinRequests, setShowJoinRequests] = useState(false);
    const [newTournamentSize, setNewTournamentSize] = useState(8);
    const [newPlayerNames, setNewPlayerNames] = useState([]);
    const [joinRequests, setJoinRequests] = useState([]);

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
            setNewPlayerNames(foundPost.playerNames || Array(foundPost.maxParticipants).fill('')); // Set initial player names
            setJoinRequests(foundPost.joinRequests || []); // Set initial join requests
        }
    }, [id, game]);

    const handleJoinTournament = () => {
        console.log(user[0].full_name);
        if (user && joinRequests.length < post.maxParticipants) {
            // const randomName = `Player${Math.floor(Math.random() * 1000)}`;
            // const updatedJoinRequests = [...joinRequests, randomName];
            const updatedJoinRequests = [...joinRequests, user[0].full_name];

            const updatedPost = { ...post, joinRequests: updatedJoinRequests };
            const updatedPosts = {
                ...allPosts,
                [game]: allPosts[game].map(p => (p.id === post.id ? updatedPost : p))
            };
            setAllPosts(updatedPosts);
            setPost(updatedPost);
            setJoinRequests(updatedJoinRequests);
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

    const handlePlayerRemove = (index) => {
        if (newPlayerNames[index]) {
            const updatedNames = [...newPlayerNames];
            updatedNames[index] = '';
            const updatedPost = { ...post, participants: post.participants - 1, playerNames: updatedNames };
            const updatedPosts = {
                ...allPosts,
                [game]: allPosts[game].map(p => (p.id === post.id ? updatedPost : p))
            };
            setAllPosts(updatedPosts);
            setPost(updatedPost);
            setNewPlayerNames(updatedNames);
            localStorage.setItem('allPosts', JSON.stringify(updatedPosts));
        }
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

    const handleAcceptRequest = (index) => {
        if (joinRequests[index] && newPlayerNames.filter(name => name).length < post.maxParticipants) {
            const updatedNames = [...newPlayerNames];
            const emptyIndex = updatedNames.findIndex(name => !name || name.startsWith('Seed'));
            if (emptyIndex !== -1) {
                updatedNames[emptyIndex] = joinRequests[index];
            }

            const updatedJoinRequests = [...joinRequests];
            updatedJoinRequests.splice(index, 1);

            const updatedPost = { ...post, joinRequests: updatedJoinRequests, playerNames: updatedNames, participants: updatedNames.filter(name => name).length };
            const updatedPosts = {
                ...allPosts,
                [game]: allPosts[game].map(p => (p.id === post.id ? updatedPost : p))
            };
            setAllPosts(updatedPosts);
            setPost(updatedPost);
            setNewPlayerNames(updatedNames);
            setJoinRequests(updatedJoinRequests);
            localStorage.setItem('allPosts', JSON.stringify(updatedPosts));
        }
    };

    const handleRejectRequest = (index) => {
        const updatedJoinRequests = [...joinRequests];
        updatedJoinRequests.splice(index, 1);

        const updatedPost = { ...post, joinRequests: updatedJoinRequests };
        const updatedPosts = {
            ...allPosts,
            [game]: allPosts[game].map(p => (p.id === post.id ? updatedPost : p))
        };
        setAllPosts(updatedPosts);
        setPost(updatedPost);
        setJoinRequests(updatedJoinRequests);
        localStorage.setItem('allPosts', JSON.stringify(updatedPosts));
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

            <div style={{ padding: '2rem'}}>
                <h1 style={{ color: 'white' }} >Welcome to {post.title} post</h1>
                <p style={{ color: 'white' }}>{post.content}</p>
                <p style={{ color: 'white' }}>Participants: {post.participants}/{post.maxParticipants}</p>
                <div className={styles.buttonContainer}>
                    <button onClick={handleJoinTournament} disabled={joinRequests.length >= post.maxParticipants}>
                        Join Tournament
                    </button>
                    <button onClick={() => setShowJoinRequests(!showJoinRequests)}>
                        Join Requests
                    </button>
                    {isEditing ? (
                        <div className={styles.editContainer}>
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
                            <button onClick={handleTournamentEdit}>
                                Save
                            </button>
                        </div>
                    ) : (
                        <button onClick={() => setIsEditing(true)}>
                            Edit Tournament
                        </button>
                    )}
                </div>
                {showJoinRequests && (
                    <div className={styles.joinRequests}>
                        <div className={styles.joinRequestsBox}>
                            {joinRequests.map((request, index) => (
                                <div key={index} className={styles.requestItem}>
                                    <p className={styles.requestName}>{request}</p>
                                    <div className={styles.requestButtons}>
                                        <button className={styles.acceptButton} onClick={() => handleAcceptRequest(index)}>V</button>
                                        <button className={styles.rejectButton} onClick={() => handleRejectRequest(index)}>X</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <TournamentTree
                    initialParticipants={post.maxParticipants || 8}
                    playerNames={newPlayerNames.length ? newPlayerNames : post.playerNames || []}
                    isEditing={isEditing}
                    onPlayerNameChange={handlePlayerNameChange}
                    onPlayerRemove={handlePlayerRemove}
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
