import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './index.css';
import { 
  Home, 
  CreateEvent, 
  EventDetails, 
  UpdateEvent, 
  Profile, 
  Task, 
  AssignedTask,
  AllTasks,
  MyEvents,
  Settings,
  Signin,
  RegisterForm
} from './components/LazyComponents';
import Layout from './Components/Layout';
import ErrorBoundary from './Components/ErrorBoundary';
import ScrollToTop from './Components/ScrollToTop';
import LoadingSpinner from './Components/LoadingSpinner';
import { AuthProvider } from './contexts/AuthContext';

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
        path: 'register',
        element: <RegisterForm />,
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
            path: '/events/my',
            element: <MyEvents />
          },
          {
            path: '/tasks',
            element: <AllTasks />
          },
          {
            path: '/settings',
            element: <Settings />
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
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={appRouter} />
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
