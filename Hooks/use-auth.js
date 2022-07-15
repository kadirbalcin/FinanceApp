import React, {useState, useContext, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export const LoginProvider = ({children}) => {
  const Login = useProvideAuth();
  return (
    <LoginContext.Provider value={Login}>{children}</LoginContext.Provider>
  );
};

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(LoginContext);
};

// Provider hook that creates auth object and handles state
const useProvideAuth = () => {
  const [user, setUser] = useState(false);

  const Check = async () => {
    const Token = await AsyncStorage.getItem('loginFirst');
    if (Token) {
      setUser(true);
    } else {
      setUser(false);
    }
  };

  // Return the user object and login methods
  return {
    user,
    Check,
  };
};
