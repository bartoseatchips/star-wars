import { ReactElement } from 'react';

import { ConfigProvider, theme } from 'antd';

import { QueryClient, QueryClientProvider } from 'react-query';

import { AuthProvider } from '@hooks';

interface ProviderProps {
  children: ReactElement | ReactElement[];
}

const queryClient = new QueryClient();

export const Provider = ({ children }: ProviderProps) => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
          }}
        >
          {children}
        </ConfigProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};
