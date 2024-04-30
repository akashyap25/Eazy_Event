import React from 'react';
import ReactDOM from 'react-dom/client';
import '../index.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Footer from './Components/Footer';
import About from './Components/About';
import Contact from './Components/Contact';
import Error from './Utils/Error';

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import Login from './Components/Login';
import Register from './Components/Register';
import CreateEvent from './Components/CreateEvent';
import EventDetail from './Components/EventDetail';
import Profile from './Components/Profile';





const AppLayout = () => {
  return (
      <>
      <Navbar  />
      <Outlet />
      <Footer/>
      </>
   
  );
};


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
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
            path: '/contact',
            element: <Contact />,
          },
          {
            path: '/about',
            element: <About />,
          },
          {
            path: '/createevent',
            element: <CreateEvent/>
          },
          {
            path: '/event/:eventId',
            element: <EventDetail/>
          },
          {
            path: '/profile',
            element: <Profile/>
          },

        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);
