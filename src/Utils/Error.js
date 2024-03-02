import React from 'react';
import { useRouteError } from 'react-router-dom';

const Error = () => {
    
    const err= useRouteError();

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='text-center'>
        <h1 className='text-5xl font-bold text-red-500 mb-4'>Oops!</h1>
        <h2 className='text-xl text-gray-700 mb-4'>{err.status + " : " + err.statusText}</h2>
        <p className='text-xl text-gray-700 mb-8'>{err.data}</p>
        <img
          className='w-80 h-80 object-cover rounded-full shadow-md mx-auto'
          src='https://cdn4.vectorstock.com/i/1000x1000/17/98/404-error-website-not-found-graphic-design-vector-22271798.jpg' 
          alt='Error'
        />
      </div>
    </div>
  );
};

export default Error;
