import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import './index.css';
import { CreateEvent, Layout, Home, EventDetails, UpdateEvent, Profile,Task,AssignedTask } from './Components';
import Signin from './Components/auth/Sign-in';

const PUBLISHABLE_KEY = 'pk_test_cHJvLXRyZWVmcm9nLTExLmNsZXJrLmFjY291bnRzLmRldiQ';

if (!PUBLISHABLE_KEY) {
  throw new Error('PUBLISHABLE_KEY is required');
}

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/sign-in',
        element: <Signin />,
      },
      {
        path: '/',
        element: <Outlet />,
        children: [
          {
            path: '/',
            element: <Home />,
          },
          {
            path: '/events/create',
            element: <CreateEvent />
          },
          {
            path: '/events/:id',
            element: <EventDetails />
          },
          {
            path: '/events/:id/update',
            element: <UpdateEvent />
          },
          {
            path: '/profile/:id',
            element: <Profile />
          },
          {
            path: '/events/:id/tasks',
            element: <Task />,
          },
          {
            path: '/tasks/:id',
            element: <AssignedTask />,
          }
        ],
      },
    ],
  },
]);

const App = () => (
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <RouterProvider router={appRouter} />
  </ClerkProvider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
