import React from 'react'
import {FiZoomIn,FiZoomOut} from 'react-icons/fi'
import {TbZoomReset} from 'react-icons/tb'
interface ZoomControlsProps {
  zoom:number
  setZoom:React.Dispatch<React.SetStateAction<number>>
}
function ZoomControls({zoom,setZoom}:ZoomControlsProps) {
  const handleZoomIn = () => setZoom((prevZoom) => Math.min(prevZoom + 0.1, 2)); // Max zoom: 2x
  const handleZoomOut = () => setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5)); // Min zoom: 0.5x
  const resetZoom = () => setZoom(1);
  return (
    <div className='h-full flex items-center justify-center gap-2'>
      <div className="tooltip" data-tip="zoom in">
      <button onClick={handleZoomOut}>
        <FiZoomOut/>
      </button>
      </div>
      <div className="tooltip" data-tip="zoom out">
      <button onClick={handleZoomIn}>
        <FiZoomIn />
      </button>
      </div>
      <div className="tooltip" data-tip="reset">
      <button onClick={resetZoom}>
        <TbZoomReset/>
      </button>
      </div>
    </div>
  )
}

export default ZoomControls