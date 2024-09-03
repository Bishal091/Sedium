import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const withAuth = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const AuthRoute: React.FC<P> = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(token !== null);

      if (!token) {
        console.log('Redirecting to /signin');
        navigate('/signin', { state: { from: location.pathname } });
      }
    }, [navigate, location.pathname]);

    if (isAuthenticated === null) {
      return null; // or a loading spinner
    }

    return isAuthenticated ? <Component {...props} /> : null;
  };

  return AuthRoute;
};

export default withAuth;