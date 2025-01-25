import React from 'react'
import ImageCard from './ImageCard'

function ImageSlider() {
  return (
    <div className='p-2 border-[1px] border-slate-700 rounded-md gap-2 flex flex-col bg-slate-900 flex-1 overflow-y-scroll'>
      <ImageCard link='' text=''/>
      <ImageCard link='' text=''/>
      <ImageCard link='' text=''/>
      <ImageCard link='' text=''/>
    </div>
  )
}

export default ImageSlider