import { useAuth } from './context/useAuth';

function App() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Threadly</h1>
      <p>{user ? `Logged in as ${user.username}` : 'Not logged in'}</p>
    </div>
  );
}

export default App;