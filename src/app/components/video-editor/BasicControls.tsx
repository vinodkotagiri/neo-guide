import { formatTime } from '@/app/helpers/time';
import React from 'react'
import { HiScissors } from "react-icons/hi2";
import { MdCrop, MdPlayCircle, MdPauseCircle } from 'react-icons/md'
import ZoomControls from './ZoomControls';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setIsPlaying, setZooming } from '@/redux/features/videoSlice';

function BasicControls() {
  const {isPlaying,currentTime,duration,zooming}=useAppSelector(state=>state.video)
  const dispatch=useAppDispatch();
  return (
    <div className='h-8 w-full flex px-3 justify-between align-center text-slate-400'>
      <div className='flex items-center gap-3'>
        <button>
          <HiScissors />
        </button>
        <button>
          <MdCrop />
        </button>
      </div>
      <div className='flex items-center gap-3'>
        <button onClick={()=>dispatch(setIsPlaying(!isPlaying))}>
          {isPlaying ? <MdPauseCircle /> : <MdPlayCircle />}
        </button>
        <div className='text-sm'>{formatTime(currentTime)} / {formatTime(duration)}</div>
      </div>
      <div>
        {zooming?
        <ZoomControls/>:
        <button className='btn btn-xs btn-secondary' onClick={() => dispatch(setZooming(true))}>zoom</button>
        }
      </div>
    </div>
  )
}

export default BasicControls