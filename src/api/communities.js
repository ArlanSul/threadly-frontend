import client from './client';

export async function getCommunities() {
    const response = await client.get('/communities/');
    return response.data;
}

export async function createCommunity(name, displayName, description) {
    const response = await client.post('/communities/', {
        name,
        display_name: displayName,
        description,
    });
    return response.data;
}