import client from './client';

export async function getPosts(params = {}) {
    const response = await client.get('/posts/', { params });
    return response.data; // { count, next, previous, results }
}

export async function getPost(id) {
    const response = await client.get(`/posts/${id}/`);
    return response.data;
}

export async function createPost(communityName, title, body) {
    const response = await client.post('/posts/', { community: communityName, title, body });
    return response.data;
}

export async function vote(targetType, id, value) {
    const payload = { value, [targetType]: id }; // targetType is 'post' or 'comment'
    const response = await client.post('/votes/', payload);
    return response.data;
}