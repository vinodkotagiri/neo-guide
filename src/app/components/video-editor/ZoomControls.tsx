import { applyZoom, getProgress } from '@/app/services/axios';
import { setLoading, setLoadingParams } from '@/redux/features/LoadingSlice';
import { setTempData, setVideoUrl, setZoom, setZoomData, setZooming } from '@/redux/features/videoSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { use, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FiZoomIn, FiZoomOut } from 'react-icons/fi'
import { TbZoomReset } from 'react-icons/tb'
function ZoomControls() {
  const { zoom, currentTime,zoomData } = useAppSelector(state => state.video)
  const [time, setTime] = useState({ start: -1, end: -1 });
  const dispatch = useAppDispatch();
  const handleZoomIn = () => dispatch(setZoom(Math.min(zoom + 0.1, 3))); // Max zoom: 3x
  const handleZoomOut = () => dispatch(setZoom(Math.max(zoom - 0.1, 0.5))); // Min zoom: 0.5x
  const resetZoom = () => dispatch(setZoom(1));
  async function handleZoomSave() {
    dispatch(setZooming(false));
    dispatch(setZoomData())
    console.log('zoom data:',zoomData);
    const response=await applyZoom(zoomData[0])
    if(response){
      toast.success(response);
    }else{
      return toast.error('Error applying zoom');
    }
    setTimeout(()=>{
      dispatch(setLoading(true))
    },500)
   const progress_interval= setInterval(async()=>{
      const progress=await getProgress();
      if(progress?.status=='failed'){
        toast.error('Error applying zoom');
        clearInterval(progress_interval);
        return

      }
      if(progress?.status=='completed'){
        
        const details=progress?.details
        if(progress?.details){
          const zoomedURL=details.split(': ')[1];
          console.log('zoomed url:',zoomedURL);
          dispatch(setVideoUrl(zoomedURL));
        }
        clearInterval(progress_interval);
      }else{
        dispatch(setLoadingParams({status:progress?.status,percentage:progress?.percentage}))
      }
    },1000)

  }
  function captureCurrentTime(capture:string) {
    if (capture == 'start') {
      setTime({ ...time, start: currentTime });
    }
    if (capture == 'end') {
      setTime({ ...time, end: currentTime });
    }
  }

  useEffect(() => {
    if (time.start > 0 && time.end > 0) {
      dispatch(setTempData({start_time:time.start,end_time:time.end}));
    }
  }, [time.start,time.end,dispatch]);

  return (
    <div className='h-full flex items-center justify-center gap-2'>
      <div className="tooltip" data-tip="zoom in">
        <button onClick={handleZoomOut}>
          <FiZoomOut />
        </button>
      </div>
      <div className="tooltip" data-tip="zoom out">
        <button onClick={handleZoomIn}>
          <FiZoomIn />
        </button>
      </div>
      <div className="tooltip" data-tip="reset">
        <button onClick={resetZoom}>
          <TbZoomReset />
        </button>
      </div>
      <button className='btn btn-xs btn-primary' onClick={()=>captureCurrentTime('start')} disabled={time.start > 0}>start</button>
      <button className='btn btn-xs btn-primary' onClick={()=>captureCurrentTime('end')} disabled={time.end > 0}>end</button>
      <div className='text-xs flex items-center justify-center'>x{zoom.toFixed(2)}</div>
      <button className='btn btn-xs btn-primary' onClick={handleZoomSave}>save</button>
    </div>
  )
}

export default ZoomControls