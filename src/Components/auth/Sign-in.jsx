import React from 'react'
import { SignIn } from '@clerk/clerk-react'

const Signin = () => {
  return (
    <div className='flex  justify-center items-center mt-5'>
      <SignIn path="/sign-in" routing="path"/>
    </div>
  )
}

export default Signin 