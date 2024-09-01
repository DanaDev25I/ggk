// withAuth.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pb } from './auth.js'; // Adjust the path if needed

const withAuth = (WrappedComponent) => {
  const AuthHOC = (props) => {
    const navigate = useNavigate();
    const isLoggedIn = Pb.authStore.isValid;

    React.useEffect(() => {
      if (!isLoggedIn) {
        navigate('/login'); // Redirect to login if not authenticated
      }
    }, [isLoggedIn, navigate]);

    if (!isLoggedIn) {
      return null; // Optionally, you could return a loading spinner or a different component
    }

    return <WrappedComponent {...props} />;
  };

  return AuthHOC;
};

export default withAuth;
