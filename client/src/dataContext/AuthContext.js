import { createContext } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  // ... any other methods or values related to authentication ...
});

export default AuthContext;
