import React, { useState } from 'react';
import styles from './CommentsSection.module.css';

const getRandomName = () => {
    const names = ['User1', 'User2', 'User3', 'User4', 'User5'];
    return names[Math.floor(Math.random() * names.length)];
};

const Comment = ({ comment, addReply, isTopLevel }) => {
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [newReply, setNewReply] = useState('');

    const handleAddReply = () => {
        if (newReply.trim() === '') return;
        const reply = {
            id: comment.replies.length + 1,
            user: getRandomName(),
            content: newReply,
            time: 'Just now',
            replies: [],
        };
        addReply(comment.id, reply);
        setNewReply('');
        setShowReplyBox(false);
    };

    return (
        <div className={styles.comment}>
            <div className={styles.commentHeader}>
                <span className={styles.user}>{comment.user}</span>
                <span className={styles.time}>{comment.time}</span>
                {isTopLevel && (
                    <button
                        className={styles.replyButton}
                        onClick={() => setShowReplyBox(!showReplyBox)}
                    >
                        {showReplyBox ? '-' : '+'}
                    </button>
                )}
            </div>
            <p className={styles.content}>{comment.content}</p>
            {showReplyBox && (
                <div className={styles.newReply}>
                    <textarea
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                        placeholder="Reply to this comment"
                    />
                    <button onClick={handleAddReply}>Reply</button>
                </div>
            )}
            {comment.replies && comment.replies.length > 0 && (
                <div className={styles.replies}>
                    {comment.replies.map(reply => (
                        <Comment key={reply.id} comment={reply} addReply={addReply} isTopLevel={false} />
                    ))}
                </div>
            )}
        </div>
    );
};

const CommentsSection = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment.trim() === '') return;
        const comment = {
            id: comments.length + 1,
            user: getRandomName(),
            content: newComment,
            time: 'Just now',
            replies: [],
        };
        setComments([...comments, comment]);
        setNewComment('');
    };

    const addReply = (commentId, reply) => {
        const updatedComments = comments.map(comment => {
            if (comment.id === commentId) {
                return { ...comment, replies: [...comment.replies, reply] };
            }
            return comment;
        });
        setComments(updatedComments);
    };

    return (
        <div className={styles.commentsSection}>
            <div className={styles.newComment}>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                />
                <button onClick={handleAddComment}>Submit</button>
            </div>
            {comments.length > 0 ? (
                comments.map(comment => (
                    <Comment key={comment.id} comment={comment} addReply={addReply} isTopLevel={true} />
                ))
            ) : (
                <p>No comments yet. Be the first to comment!</p>
            )}
        </div>
    );
};

export default CommentsSection;
