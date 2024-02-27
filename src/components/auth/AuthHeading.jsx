import React from 'react'

function AuthHeading({heading}) {
  return (
    <div className='h-[104.6px] w-full bg-[#f7f7f7] py-3 px-5 rounded-md flex justify-center items-center text-[1.65rem] border'>
        <h3 className='headingFont text-[#2a2e32]'>{heading}</h3>
    </div>
  )
}

export default AuthHeading