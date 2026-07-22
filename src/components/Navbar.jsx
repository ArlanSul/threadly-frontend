import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate('/');
    }

    return (
        <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #ccc' }}>
            <Link to="/">Threadly</Link>
            {user ? (
                <>
                    <Link to="/create-post">New Post</Link>
                    <span>Hi, {user.username}</span>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
            <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </>
            )}
        </nav>
    );
}