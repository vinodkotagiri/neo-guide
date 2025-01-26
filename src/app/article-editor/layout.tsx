import React from 'react'
import Navbar from '../components/navbar/navbar'

export default function ArticleEditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div className='w-dvh h-dvh flex flex-col overflow-hidden'>
    <Navbar/>
    <div className='h-[calc(100vh-64px)] w-full'>
    {children}
    </div>
   </div>
  );
}
