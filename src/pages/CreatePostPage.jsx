import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/posts';
import { useAuth } from '../context/useAuth';
import { getCommunities, createCommunity } from '../api/communities';

export default function CreatePostPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [communities, setCommunities] = useState([]);
    const [community, setCommunity] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [creatingCommunity, setCreatingCommunity] = useState(false);
    const [newCommunityName, setNewCommunityName] = useState('');
    const [newCommunityDisplayName, setNewCommunityDisplayName] = useState('');
    const [newCommunityDescription, setNewCommunityDescription] = useState('');

    useEffect(() => {
        async function loadCommunities() {
            const data = await getCommunities();
            setCommunities(data.results);
            if (data.results.length > 0) {
                setCommunity(data.results[0].name);
            }
            }
            loadCommunities();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            let targetCommunity = community;

            if (creatingCommunity) {
            const newCommunity = await createCommunity(
                newCommunityName,
                newCommunityDisplayName,
                newCommunityDescription
            );
            targetCommunity = newCommunity.name;
            }

            const post = await createPost(targetCommunity, title, body);
            navigate(`/posts/${post.id}`);
        } catch (err) {
            const data = err.response?.data;
            const message = data ? Object.values(data).flat().join(' ') : 'Failed to create post';
            setError(message);
        } finally {
            setSubmitting(false);
        }
    }

    if (!user) {
        return <p style={{ padding: '1rem' }}>You must be logged in to create a post.</p>;
    }

    return (
        <div style={{ padding: '1rem', maxWidth: 500 }}>
        <h2>Create Post</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
            
        <div>
        <label>
            <input
            type="checkbox"
            checked={creatingCommunity}
            onChange={(e) => setCreatingCommunity(e.target.checked)}
            />
            {' '}Create a new community
        </label>
        </div>

        {creatingCommunity ? (
        <>
            <div>
            <label>Community name (URL-safe, e.g. "webdev")</label>
            <input
                value={newCommunityName}
                onChange={(e) => setNewCommunityName(e.target.value)}
                required
                style={{ width: '100%' }}
            />
            </div>
            <div>
            <label>Display name</label>
            <input
                value={newCommunityDisplayName}
                onChange={(e) => setNewCommunityDisplayName(e.target.value)}
                required
                style={{ width: '100%' }}
            />
            </div>
            <div>
            <label>Description</label>
            <textarea
                value={newCommunityDescription}
                onChange={(e) => setNewCommunityDescription(e.target.value)}
                rows={2}
                style={{ width: '100%' }}
            />
            </div>
        </>
        ) : (
        <div>
            <label>Community</label>
            <select value={community} onChange={(e) => setCommunity(e.target.value)} required>
            {communities.map((c) => (
                <option key={c.id} value={c.name}>
                {c.display_name}
                </option>
            ))}
            </select>
        </div>
        )}

            <div>
            <label>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: '100%' }} />
            </div>
            <div>
            <label>Body</label>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={5} style={{ width: '100%' }} />
            </div>
            <button type="submit" disabled={submitting}>
            {submitting ? 'Posting...' : 'Post'}
            </button>
        </form>
        </div>
    );
}