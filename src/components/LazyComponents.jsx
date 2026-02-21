import React, { Suspense, lazy } from 'react';
import LoadingSpinner from '../Components/LoadingSpinner';
import UpdateEvent from '../Components/Events/UpdateEvent';

// Lazy load all major components
export const LazyHome = lazy(() => import('../Components/Home'));
export const LazyCreateEvent = lazy(() => import('../Components/Events/CreateEvent'));
export const LazyEventDetails = lazy(() => import('../Components/Events/EventDetails'));
// Temporarily disable lazy loading for UpdateEvent
// export const LazyUpdateEvent = lazy(() => import('../Components/Events/UpdateEvent'));
export const LazyMyEvents = lazy(() => import('../Components/Events/MyEvents'));
export const LazyProfile = lazy(() => import('../Components/Profile'));
// Temporarily disable lazy loading for components with Material-UI
export const LazyTask = lazy(() => import('../Components/Events/Task'));
export const LazyAssignedTask = lazy(() => import('../Components/General/AssignedTask'));
export const LazyAllTasks = lazy(() => import('../Components/General/AllTasks'));
export const LazySettings = lazy(() => import('../Components/General/Settings'));
export const LazySignin = lazy(() => import('../Components/auth/Sign-in'));
export const LazyRegisterForm = lazy(() => import('../Components/auth/RegisterForm'));

// Higher-order component for lazy loading with error boundary
export const withLazyLoading = (Component, fallback = <LoadingSpinner size="lg" text="Loading..." />) => {
  return (props) => (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
};

// Pre-configured lazy components with loading states
export const Home = withLazyLoading(LazyHome);
export const CreateEvent = withLazyLoading(LazyCreateEvent);
export const EventDetails = withLazyLoading(LazyEventDetails);
// Use direct import instead of lazy loading for UpdateEvent
export { UpdateEvent };
export const MyEvents = withLazyLoading(LazyMyEvents);
export const Profile = withLazyLoading(LazyProfile);
export const Task = withLazyLoading(LazyTask);
export const AssignedTask = withLazyLoading(LazyAssignedTask);
export const AllTasks = withLazyLoading(LazyAllTasks);
export const Settings = withLazyLoading(LazySettings);
export const Signin = withLazyLoading(LazySignin);
export const RegisterForm = withLazyLoading(LazyRegisterForm);