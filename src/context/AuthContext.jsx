import { useState } from 'react';
import { AuthContext } from './context';
import { loginUser, registerUser } from '../api/auth';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('access_token');
        const username = localStorage.getItem('username');
        if (token && username) {
            return { username };
        }
        return null;
    });

    async function login(username, password) {
        const data = await loginUser(username, password);
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        localStorage.setItem('username', username);
        setUser({ username });
    }

    async function register(username, email, password) {
        await registerUser(username, email, password);
        await login(username, password);
    }

    function logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('username');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}