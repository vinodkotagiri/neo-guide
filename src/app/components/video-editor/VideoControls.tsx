import React from 'react'
import BasicControls from './BasicControls'
import AdvancedControls from './AdvancedControls'

function VideoControls({playing,setPlaying,currentTime,duration}) {
  return (
    <div className='w-full h-full p-2'>
      <BasicControls playing={playing }setPlaying={setPlaying} currentTime={currentTime} duration={duration}/>
      <AdvancedControls/>
    </div>
  )
}

export default VideoControls