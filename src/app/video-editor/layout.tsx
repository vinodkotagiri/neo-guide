import React from 'react'
import Navbar from '../components/navbar/navbar'

export default function VideoEditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div className='w-screen h-screen flex flex-col overflow-hidden'>
    <Navbar/>
    <div className='flex-1 w-full'>
    {children}
    </div>
   </div>
  );
}
