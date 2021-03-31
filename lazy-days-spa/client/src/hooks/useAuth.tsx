// Adapted from https://usehooks.com/useAuth/
// Easy to understand React Hook recipes by Gabe Ragland
import 'firebase/auth';

import firebase from 'firebase/app';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Add your Firebase credentials
firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectID: process.env.FIREBASE_PROJECTID,
  appID: process.env.FIREBASE_APPID,
});

interface AuthUserAndMethods {
  user: firebase.User | null;
  error: string | null;
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  signout: () => void;
}

const authContext = createContext<AuthUserAndMethods | null>(null);

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({
  children,
}: React.ProviderProps<AuthUserAndMethods>): React.ReactNode {
  const auth = useProvideAuth();
  const AuthProvider = authContext.Provider;
  return <AuthProvider value={auth}>{children}</AuthProvider>;
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = (): AuthUserAndMethods | null => {
  return useContext(authContext);
};
// Provider hook that creates auth object and handles state
// eslint-disable-next-line max-lines-per-function
function useProvideAuth(): AuthUserAndMethods {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  async function signin(email: string, password: string): Promise<void> {
    try {
      setError(null);
      const response: firebase.auth.UserCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      setUser(response.user);
    } catch (firebaseError) {
      setError(firebaseError);
    }
  }
  async function signup(email: string, password: string): Promise<void> {
    try {
      setError(null);
      const response: firebase.auth.UserCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      setUser(response.user);
    } catch (firebaseError) {
      setError(firebaseError);
    }
  }
  async function signout(): Promise<void> {
    try {
      setError(null);
      await firebase.auth().signOut();
      setUser(null);
    } catch (firebaseError) {
      setError(firebaseError);
    }
  }
  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((newUser) => {
      setUser(newUser || null);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    error,
    signin,
    signup,
    signout,
  };
}
