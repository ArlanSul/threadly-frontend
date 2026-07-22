import { useState } from 'react';
import { vote } from '../api/posts';
import { useAuth } from '../context/useAuth';

export default function VoteButtons({ targetType, id, initialScore, initialMyVote }) {
    const [score, setScore] = useState(initialScore);
    const [myVote, setMyVote] = useState(initialMyVote);
    const { user } = useAuth();

    async function handleVote(value) {
        if (!user) return;

        const previousScore = score;
        const previousMyVote = myVote;

        if (myVote === value) {
            setScore(score - value);
            setMyVote(null);
        } else {
            const delta = myVote ? value * 2 : value; // switching flips by 2x, new vote by 1x
            setScore(score + delta);
            setMyVote(value);
        }

        try {
            await vote(targetType, id, value);
        } catch {
            setScore(previousScore);
            setMyVote(previousMyVote);
        }
    }   

    return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
        <button
            onClick={() => handleVote(1)}
            style={{ color: myVote === 1 ? 'orange' : 'black', border: 'none', background: 'none', cursor: 'pointer' }}
        >
            ▲
        </button>
        <span>{score}</span>
        <button
            onClick={() => handleVote(-1)}
            style={{ color: myVote === -1 ? 'blue' : 'black', border: 'none', background: 'none', cursor: 'pointer' }}
        >
            ▼
        </button>
        </span>
    );
}