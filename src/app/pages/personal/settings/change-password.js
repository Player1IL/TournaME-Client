// src/app/pages/personal/settings/change-password.js
"use client";

import { useState } from 'react';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = () => {
        if (newPassword !== confirmPassword) {
            alert("New passwords do not match!");
            return;
        }

        // Handle password change logic here
        alert("Password changed successfully.");
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4, bgcolor: '#121212', color: '#fff', p: 3, borderRadius: '10px' }}>
            <Typography variant="h4" align="center" sx={{ mb: 4 }}>
                Change Password
            </Typography>
            <Paper elevation={3} sx={{ p: 4, borderRadius: '10px', backgroundColor: '#1e1e1e', color: '#fff' }}>
                <div>
                    <TextField
                        label="Old Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        InputLabelProps={{ sx: { color: '#fff' } }}
                        InputProps={{ sx: { color: '#fff' } }}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="New Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
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
                    color="primary" 
                    onClick={handleChangePassword}
                    sx={{ mt: 2, width: '100%' }}
                >
                    Change Password
                </Button>
            </Paper>
        </Container>
    );
};

export default ChangePassword;
