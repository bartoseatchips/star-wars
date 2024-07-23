import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Layout } from 'antd';

import { ProtectedRoute } from './protectedRoute';

import { Characters } from '@pages';

import { Header } from 'views';

import { Provider } from 'provider';
import { CharacterDetails } from 'pages/characterDetails/CharacterDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Provider>
        <Layout
          style={{
            width: '100vw',
            height: '100vh',
          }}
        >
          <Header />
          <Layout
            style={{
              padding: 20,
              maxWidth: 1100,
              margin: '0 auto',
              width: '100%',
              height: '100%',
              overflow: 'scroll',
            }}
          >
            <Outlet />
          </Layout>
        </Layout>
      </Provider>
    ),
    children: [
      {
        path: '/',
        element: <Characters />,
      },
      {
        path: '/characters/:characterId',
        element: <CharacterDetails />,
      },
      {
        path: '/private',
        element: (
          <ProtectedRoute>
            <div>private</div>
          </ProtectedRoute>
        ),
      },
      {
        path: '/login',
        element: <div>login</div>,
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
