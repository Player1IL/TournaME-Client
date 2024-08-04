// src/app/pages/personal/settings/delete-account.js
"use client";

import { useState } from 'react';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';

const DeleteAccount = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleDelete = () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const confirmation = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (confirmation) {
            // Handle account deletion logic here
            alert("Account deleted successfully.");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4, bgcolor: '#121212', color: '#fff', p: 3, borderRadius: '10px' }}>
            <Typography variant="h4" align="center" sx={{ mb: 4 }}>
                Delete Account
            </Typography>
            <Paper elevation={3} sx={{ p: 4, borderRadius: '10px', backgroundColor: '#1e1e1e', color: '#fff' }}>
                <div>
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputLabelProps={{ sx: { color: '#fff' } }}
                        InputProps={{ sx: { color: '#fff' } }}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        InputLabelProps={{ sx: { color: '#fff' } }}
                        InputProps={{ sx: { color: '#fff' } }}
                        sx={{ mb: 2 }}
                    />
                </div>
                <Button 
                    variant="contained" 
                    color="error" 
                    onClick={handleDelete}
                    sx={{ mt: 2, width: '100%' }}
                >
                    Confirm
                </Button>
            </Paper>
        </Container>
    );
};

export default DeleteAccount;
