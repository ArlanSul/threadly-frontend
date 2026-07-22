import { useState, useEffect } from 'react';
import { getPosts } from '../api/posts';
import PostCard from '../components/PostCard';

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const data = await getPosts();
                setPosts(data.results);
            } catch  {
                setError('Failed to load posts');
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    if (loading) return <p style={{ padding: '1rem' }}>Loading posts...</p>;
    if (error) return <p style={{ padding: '1rem', color: 'red' }}>{error}</p>;

    return (
        <div style={{ padding: '1rem', maxWidth: 600 }}>
            <h2>Home</h2>
            {posts.length === 0 ? (
            <p>No posts yet.</p>
            ) : (
            posts.map((post) => <PostCard key={post.id} post={post} />)
            )}
        </div>
    );
}