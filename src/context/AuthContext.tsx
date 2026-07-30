import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';

type AuthContextType = {
  isLoggedIn: boolean;
  startupCompleted: boolean;
  startupInitialRoute: 'Splash' | 'Onboarding';
  signIn: () => void;
  signOut: () => void;
  completeStartup: () => void;
  returnToOnboarding: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({children}: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [startupCompleted, setStartupCompleted] =
    useState(false);
  const [startupInitialRoute, setStartupInitialRoute] =
    useState<'Splash' | 'Onboarding'>('Splash');

  const signIn = () => {
    setIsLoggedIn(true);
  };

  const signOut = () => {
    setIsLoggedIn(false);
  };

  const completeStartup = () => {
    setStartupCompleted(true);
  };

  const returnToOnboarding = () => {
    setStartupInitialRoute('Onboarding');
    setStartupCompleted(false);
  };

  const value = useMemo(
    () => ({
      isLoggedIn,
      startupCompleted,
      startupInitialRoute,
      signIn,
      signOut,
      completeStartup,
      returnToOnboarding,
    }),
    [isLoggedIn, startupCompleted, startupInitialRoute],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider',
    );
  }

  return context;
};
