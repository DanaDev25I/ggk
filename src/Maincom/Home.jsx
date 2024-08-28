import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../store/usecontext';
import PocketBase from 'pocketbase';
const pb = new PocketBase('https://search-app.pockethost.io/');

const HomePage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useStateContext();

  const handleLogout = async () => {
    try {
      await pb.authStore.clear();
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error.message || error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {user ? (
        <>
          <h1 className="text-4xl font-bold mb-6">Hi, {user.username}!</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white font-bold rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-6">Welcome to the Home Page!</h1>
          <div className="space-x-4">
            <Link to="/login" className="px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700">
              Log In
            </Link>
            <Link to="/signup" className="px-4 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700">
              Sign Up
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
