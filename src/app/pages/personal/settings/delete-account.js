// src/app/pages/personal/settings/delete-account.js
"use client";

import { useState } from 'react';

const DeleteAccount = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleDelete = () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const confirmation = confirm("Are you sure you want to delete your account?");
        if (confirmation) {
            // Handle account deletion logic here
            alert("Account deleted successfully.");
        }
    };

    return (
        <div>
            <h1>Delete Account</h1>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <label>Confirm Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <button onClick={handleDelete}>Confirm</button>
        </div>
    );
};

export default DeleteAccount;
