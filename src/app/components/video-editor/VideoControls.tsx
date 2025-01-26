'use client';
import React from 'react'
import BasicControls from './BasicControls'
import AdvancedControls from './AdvancedControls'

function VideoControls() {
  return (
    <div className='w-full h-full p-2'>
      <BasicControls />
      <AdvancedControls/>
    </div>
  )
}

export default VideoControls