import React from 'react'
import { SignIn } from '@clerk/clerk-react'

const Signin = () => {
  return (
    <div className='flex  justify-center items-center mt-5'>
      <SignIn path="/sign-in" routing="path" className='button w-auto h-auto bg-orange-500 hover:bg-orange-700'/>
    </div>
  )
}

export default Signin