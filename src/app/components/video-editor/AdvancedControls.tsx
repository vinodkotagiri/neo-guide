import React from 'react'

function AdvancedControls() {
  return (
    <div className='w-full h-full'>
      <div className='relative w-full h-12 bg-green-800 opacity-90 cursor-pointer'>
        <div className='absolute w-1 h-full bg-purple-500' style={{left: '50%'}}/>
      </div>
    </div>
  )
}

export default AdvancedControls