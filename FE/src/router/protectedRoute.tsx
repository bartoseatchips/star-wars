import { useAuth } from '@hooks';
import { ReactElement, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type TProps = {
  children: ReactElement | ReactNode;
};

export const ProtectedRoute = ({ children }: TProps) => {
  const { user } = useAuth();
  console.log(user);
  if (!user) {
    return <Navigate to='/login' />;
  }
  return children;
};
