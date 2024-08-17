"use client"; // This line makes the component a Client Component

import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check local storage for the user state on initial load
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const loginUser = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};
