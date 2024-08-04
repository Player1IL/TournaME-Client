// src/app/pages/personal/settings/friends-list.js
import React from 'react';
import FriendCard from 'src/app/components/FriendCard';
import { Container, Typography, Grid, Paper } from '@mui/material';

// Sample data
const friends = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', avatar: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', avatar: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', avatar: 'https://via.placeholder.com/150' },
];

const FriendsList = () => {
    return (
        <Container maxWidth="md" sx={{ mt: 4, bgcolor: '#121212', color: '#fff' }}>
            <Typography variant="h4" align="center" sx={{ mb: 4 }}>
                Friends List
            </Typography>
            <Paper elevation={3} sx={{
                p: 4,
                borderRadius: '10px',
                backgroundColor: '#1e1e1e', // Dark background for dark theme
                color: '#fff', // White text for contrast
            }}>
                <Grid container spacing={2}>
                    {friends.map(friend => (
                        <Grid item xs={12} sm={6} md={4} key={friend.id}>
                            <FriendCard friend={friend} />
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Container>
    );
};

export default FriendsList;
