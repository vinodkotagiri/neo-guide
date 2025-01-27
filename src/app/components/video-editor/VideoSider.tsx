import React from 'react'
import TranscriptControls from './TranscriptControls'
// import ImageSlider from './ImageSlider'

function VideoSider() {
  return (
    <div className='w-full h-full p-2 rounded-md overflow-auto '>
      <div className='flex flex-col gap-2 h-full overflow-auto'>
        <TranscriptControls/>
        {/* <ImageSlider/> */}
      </div>
    </div>
  )
}

export default VideoSider