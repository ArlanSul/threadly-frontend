import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
    return (
        <div style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '0.75rem', borderRadius: 6 }}>
            <div style={{ fontSize: '0.8rem', color: '#666' }}>
            r/{post.community} · posted by {post.author.username}
            </div>
            <Link to={`/posts/${post.id}`} style={{ fontSize: '1.1rem', fontWeight: 'bold', textDecoration: 'none' }}>
            {post.title}
            </Link>
            <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.4rem' }}>
            ▲ {post.score} · {post.comment_count} comments
            </div>
        </div>
    );
}