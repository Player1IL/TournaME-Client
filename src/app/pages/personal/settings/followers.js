// src/app/pages/personal/settings/followers.js
"use client";

import React from 'react';
import { Container, Typography, Paper, List, ListItem, ListItemText, Avatar, Divider } from '@mui/material';

// Sample data for followers
const followers = [
    { id: 1, name: 'Alice Johnson', avatar: 'https://via.placeholder.com/80' },
    { id: 2, name: 'Bob Smith', avatar: 'https://via.placeholder.com/80' },
    { id: 3, name: 'Charlie Brown', avatar: 'https://via.placeholder.com/80' },
];

const Followers = () => (
    <Container maxWidth="sm" sx={{ mt: 4, bgcolor: '#121212', color: '#fff', p: 3, borderRadius: '10px' }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
            Followers
        </Typography>
        <Paper elevation={3} sx={{ p: 2, borderRadius: '10px', backgroundColor: '#1e1e1e', color: '#fff' }}>
            <List>
                {followers.map(follower => (
                    <React.Fragment key={follower.id}>
                        <ListItem>
                            <Avatar src={follower.avatar} alt={follower.name} sx={{ marginRight: 2 }} />
                            <ListItemText primary={follower.name} />
                        </ListItem>
                        <Divider sx={{ bgcolor: '#444' }} />
                    </React.Fragment>
                ))}
            </List>
        </Paper>
    </Container>
);

export default Followers;
