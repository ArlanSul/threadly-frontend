import { useState } from 'react';
import { createComment } from '../api/posts';
import { useAuth } from '../context/useAuth';
import VoteButtons from './VoteButtons';

export default function Comment({ comment, depth = 0, postId, onReplyPosted }) {
    const { user } = useAuth();
    const [replying, setReplying] = useState(false);
    const [replyBody, setReplyBody] = useState('');

    async function handleReplySubmit(e) {
        e.preventDefault();
        if (!replyBody.trim()) return;
        await createComment(postId, replyBody, comment.id);
        setReplyBody('');
        setReplying(false);
        onReplyPosted();
    }

    return (
        <div style={{ marginLeft: depth * 20, marginTop: '0.75rem' }}>
        <div style={{ fontSize: '0.85rem', color: '#666' }}>{comment.author.username}</div>
        <div>{comment.body}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <VoteButtons targetType="comment" id={comment.id} initialScore={comment.score} initialMyVote={comment.my_vote} />
            {user && (
            <button onClick={() => setReplying(!replying)} style={{ fontSize: '0.8rem' }}>
                {replying ? 'Cancel' : 'Reply'}
            </button>
            )}
        </div>

        {replying && (
            <form onSubmit={handleReplySubmit} style={{ marginTop: '0.4rem' }}>
            <textarea
                value={replyBody}
                onChange={(e) => setReplyBody(e.target.value)}
                rows={2}
                style={{ width: '100%' }}
            />
            <button type="submit">Reply</button>
            </form>
        )}

        {comment.replies.length > 0 && (
            <div>
            {comment.replies.map((reply) => (
                <Comment key={reply.id} comment={reply} depth={depth + 1} postId={postId} onReplyPosted={onReplyPosted} />
            ))}
            </div>
        )}
        </div>
    );
}