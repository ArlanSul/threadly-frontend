import { Link } from 'react-router-dom';
import VoteButtons from './VoteButtons';

export default function PostCard({ post }) {
    return (
        <div style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '0.75rem', borderRadius: 6 }}>
        <div style={{ fontSize: '0.8rem', color: '#666' }}>
            r/{post.community} · posted by {post.author.username}
        </div>
        <Link to={`/posts/${post.id}`} style={{ fontSize: '1.1rem', fontWeight: 'bold', textDecoration: 'none' }}>
            {post.title}
        </Link>
        <div style={{ marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <VoteButtons targetType="post" id={post.id} initialScore={post.score} initialMyVote={post.my_vote} />
            <span style={{ fontSize: '0.85rem', color: '#666' }}>{post.comment_count} comments</span>
        </div>
        </div>
    );
}