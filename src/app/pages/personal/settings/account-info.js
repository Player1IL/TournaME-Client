// src/app/pages/personal/settings/account-info.js
"use client";

import React from 'react';
import { Container, Typography, Avatar, Grid, Paper, Box } from '@mui/material';

const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://via.placeholder.com/150',
    gamingHandle: 'Gamer123',
    dateOfBirth: '1990-01-01',
    age: 34,
    country: 'USA',
    mainGame: 'League of Legends',
    recentTournaments: [
        { name: 'Summer Championship 2023', date: '2023-06-15' },
        { name: 'Winter Showdown 2022', date: '2022-12-10' }
    ],
};

const AccountInfo = () => (
    <Container maxWidth="md" sx={{ mt: 4, bgcolor: '#121212', color: '#fff', minHeight: '100vh' }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
            Account Info
        </Typography>

        <Paper elevation={3} sx={{
            p: 4,
            mb: 4,
            borderRadius: '10px',
            backgroundColor: '#1e1e1e',
            color: '#fff',
        }}>
            <Typography variant="h6" gutterBottom>
                Profile Information
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <Avatar src={user.avatar} alt={user.name} sx={{ width: 100, height: 100 }} />
                </Grid>
                <Grid item xs={12} sm={9}>
                    <Typography variant="h6">{user.name}</Typography>
                    <Typography color="textSecondary">{user.gamingHandle}</Typography>
                    <Typography color="textSecondary">{user.email}</Typography>
                </Grid>
            </Grid>
        </Paper>

        <Paper elevation={3} sx={{
            p: 4,
            mb: 4,
            borderRadius: '10px',
            backgroundColor: '#1e1e1e',
            color: '#fff',
        }}>
            <Typography variant="h6" gutterBottom>
                Additional Information
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Box padding={1}>
                        <Typography variant="body1">
                            <strong>Date of Birth:</strong> {user.dateOfBirth}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box padding={1}>
                        <Typography variant="body1">
                            <strong>Age:</strong> {user.age}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box padding={1}>
                        <Typography variant="body1">
                            <strong>Country:</strong> {user.country}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box padding={1}>
                        <Typography variant="body1">
                            <strong>Main Game:</strong> {user.mainGame}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Paper>

        <Paper elevation={3} sx={{
            p: 4,
            borderRadius: '10px',
            backgroundColor: '#1e1e1e',
            color: '#fff',
        }}>
            <Typography variant="h6" gutterBottom>
                Recent Tournaments
            </Typography>
            {user.recentTournaments.length > 0 ? (
                <ul>
                    {user.recentTournaments.map((tournament, index) => (
                        <li key={index}>
                            <Typography variant="body1">
                                <strong>{tournament.name}</strong> - {tournament.date}
                            </Typography>
                        </li>
                    ))}
                </ul>
            ) : (
                <Typography variant="body1">
                    No recent tournaments.
                </Typography>
            )}
        </Paper>
    </Container>
);

export default AccountInfo;
