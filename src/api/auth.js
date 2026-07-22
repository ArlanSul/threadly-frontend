import client from './client';

export async function registerUser(username, email, password) {
    const response = await client.post('/auth/register/', { username, email, password });
    return response.data;
}

export async function loginUser(username, password) {
    const response = await client.post('/auth/login/', { username, password });
    return response.data; // { access, refresh }
}

export async function refreshToken(refresh) {
    const response = await client.post('/auth/refresh/', { refresh });
    return response.data; // { access }
}