import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPost, createComment } from '../api/posts';
import { useAuth } from '../context/useAuth';
import Comment from '../components/Comment';
import VoteButtons from '../components/VoteButtons';

export default function PostDetailPage() {
    const { id } = useParams();
    const { user } = useAuth();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [commentBody, setCommentBody] = useState('');

    useEffect(() => {
        loadPost();
    }, [id]);

    async function loadPost() {
        setLoading(true);
        const data = await getPost(id);
        setPost(data);
        setLoading(false);
    }

    async function handleCommentSubmit(e) {
        e.preventDefault();
        if (!commentBody.trim()) return;
        await createComment(id, commentBody);
        setCommentBody('');
        loadPost(); // re-fetch so the new comment appears
    }

    if (loading) return <p style={{ padding: '1rem' }}>Loading...</p>;
    if (!post) return <p style={{ padding: '1rem' }}>Post not found.</p>;

    return (
        <div style={{ padding: '1rem', maxWidth: 600 }}>
            <div style={{ fontSize: '0.8rem', color: '#666' }}>
            r/{post.community} · posted by {post.author.username}
            </div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <VoteButtons targetType="post" id={post.id} initialScore={post.score} initialMyVote={post.my_vote} />
                <span style={{ fontSize: '0.85rem', color: '#666' }}>{post.comment_count} comments</span>
            </div>

            <hr style={{ margin: '1rem 0' }} />

            {user ? (
            <form onSubmit={handleCommentSubmit}>
                <textarea
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                placeholder="Add a comment..."
                rows={3}
                style={{ width: '100%' }}
                />
                <button type="submit">Comment</button>
            </form>
            ) : (
            <p style={{ color: '#666' }}>Log in to comment.</p>
            )}

            <div style={{ marginTop: '1rem' }}>
            {post.comments.map((comment) => (
                <Comment key={comment.id} comment={comment} postId={id} onReplyPosted={loadPost} />
            ))}
            </div>
        </div>
    );
}