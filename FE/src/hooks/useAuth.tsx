import { ReactElement, createContext, useContext, useMemo } from 'react';

import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from '@hooks';

const AuthContext = createContext<null | any>({});

type TProps = {
  children: ReactElement | ReactElement[];
};

export const AuthProvider = ({ children }: TProps) => {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();

  const login = async (data: any) => {
    setUser(data);
    navigate('/profile');
  };

  const logout = () => {
    setUser(null);
    navigate('/', { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),

    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
