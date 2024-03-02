import React from 'react';

const Contact = () => {
  return (
    <div className='bg-gray-100 h-screen flex flex-col items-center justify-center'>
      <div className='bg-white p-8 rounded-lg shadow-md max-w-md'>
        <h1 className='text-3xl font-bold mb-6'>Contact Us</h1>
        <p className='mb-4'>
          If you have any questions, feedback, or concerns, feel free to reach out to us. We value your input and are here to assist you in any way we can.
        </p>
        <p className='mb-4'>
          You can contact us through the following channels:
        </p>
        <ul className='list-disc pl-6 mb-4'>
          <li>Email: <span className='text-blue-500'>contact@[QuickBite].com</span></li>
          <li>Phone: <span className='text-blue-500'>[+91-1234567890]</span></li>
          <li>Visit our office: <span className='text-blue-500'>[Muradnagar,Ghaziabad,Uttar Pradesh, India]</span></li>
        </ul>
        <p>
          Our support team is available to help you from <span className='text-blue-500'>[9:00am-5:00pm]</span>. We look forward to hearing from you!
        </p>
      </div>
    </div>
  );
};

export default Contact;
