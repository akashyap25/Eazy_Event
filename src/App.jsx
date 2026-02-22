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
import OAuthCallback from './Pages/OAuthCallback';
import Support from './Pages/Support';
import Layout from './Components/Layout';
import ErrorBoundary from './Components/ErrorBoundary';
import ScrollToTop from './Components/ScrollToTop';
import LoadingSpinner from './Components/LoadingSpinner';
import ProtectedRoute from './Components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

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
        path: '/oauth/callback',
        element: <OAuthCallback />,
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
            element: <ProtectedRoute><CreateEvent /></ProtectedRoute>
          },
          {
            path: '/events/my',
            element: <ProtectedRoute><MyEvents /></ProtectedRoute>
          },
          {
            path: '/tasks',
            element: <ProtectedRoute><AllTasks /></ProtectedRoute>
          },
          {
            path: '/settings',
            element: <ProtectedRoute><Settings /></ProtectedRoute>
          },
          {
            path: '/events/:id',
            element: <EventDetails />
          },
          {
            path: '/events/:id/update',
            element: <ProtectedRoute><UpdateEvent /></ProtectedRoute>
          },
          {
            path: '/profile/:id',
            element: <ProtectedRoute><Profile /></ProtectedRoute>
          },
          {
            path: '/events/:id/tasks',
            element: <ProtectedRoute><Task /></ProtectedRoute>,
          },
          {
            path: '/tasks/:id',
            element: <ProtectedRoute><AssignedTask /></ProtectedRoute>,
          },
          {
            path: '/support',
            element: <Support />
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
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={appRouter} />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
