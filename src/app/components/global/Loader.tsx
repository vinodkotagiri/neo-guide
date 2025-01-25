'use client'
import React from 'react'

const Loader = () => {
  return (
    <div  className='fixed w-screen h-screen flex justify-center items-center bg-black opacity-90 z-auto'>
    <span className="loading loading-bars loading-lg text-secondary"></span>
    </div>
  )
}

export default Loader