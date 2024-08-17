// src/app/pages/personal/settings/activity.js
"use client";

import React from 'react';
import { Container, Typography, Paper, List, ListItem, ListItemText, Divider, Box } from '@mui/material';

// Sample data for recent activity
const activities = [
    { id: 1, description: 'Participated in the Summer Tournament', date: 'August 2, 2024' },
    { id: 2, description: 'Won the Weekly Challenge', date: 'July 28, 2024' },
    { id: 3, description: 'Joined the Fall League', date: 'July 15, 2024' },
];

const Activity = () => (
    <Container maxWidth="sm" sx={{ mt: 4, bgcolor: '#121212', color: '#fff', p: 3, borderRadius: '10px' }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
            Tournament Activity
        </Typography>
        <Paper elevation={3} sx={{ p: 2, borderRadius: '10px', backgroundColor: '#1e1e1e', color: '#fff' }}>
            <List>
                {activities.map(activity => (
                    <React.Fragment key={activity.id}>
                        <ListItem>
                            <ListItemText 
                                primary={activity.description} 
                                secondary={activity.date}
                                primaryTypographyProps={{ sx: { color: '#fff' } }}
                                secondaryTypographyProps={{ sx: { color: '#aaa' } }}
                            />
                        </ListItem>
                        <Divider sx={{ bgcolor: '#444' }} />
                    </React.Fragment>
                ))}
            </List>
        </Paper>
    </Container>
);

export default Activity;
