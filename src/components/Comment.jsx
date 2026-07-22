export default function Comment({ comment, depth = 0 }) {
    return (
        <div style={{ marginLeft: depth * 20, marginTop: '0.75rem' }}>
        <div style={{ fontSize: '0.85rem', color: '#666' }}>
            {comment.author.username}
        </div>
        <div>{comment.body}</div>
        <div style={{ fontSize: '0.8rem', color: '#666' }}>▲ {comment.score}</div>

        {comment.replies.length > 0 && (
            <div>
            {comment.replies.map((reply) => (
                <Comment key={reply.id} comment={reply} depth={depth + 1} />
            ))}
            </div>
        )}
        </div>
    );
}