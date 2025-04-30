// React Context for managing authentication state

// This context provides the current user and a function to update the user state
// It fetches the current user from the server when the component mounts and updates the state accordingly


// client/src/context/AuthContext.jsx

// React
import { createContext, useContext, useState, useEffect } from 'react';

// Services
import { getCurrentUser } from '../services/authService';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser()
      .then(res => {
      if (res.data.user) setUser(res.data.user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

