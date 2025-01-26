/* eslint-disable react-hooks/exhaustive-deps */
import { setCurrentTime } from "@/redux/features/videoSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useState, useRef, useEffect } from "react";

const Timeline = () => {
  const [isDragging, setIsDragging] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { duration, currentTime, clips, zoomData } = useAppSelector(state => state.video);

  // Handles mouse down event to initiate dragging
  const handleMouseDown = (event: React.MouseEvent) => {
    if (!timelineRef.current) return;
    setIsDragging(true);
    const timelineRect = timelineRef.current.getBoundingClientRect();
    const clickPosition = event.clientX - timelineRect.left;
    const newTime = (clickPosition / timelineRect.width) * duration;
    dispatch(setCurrentTime(newTime));
  };

  // Handles the mouse move event to update currentTime when dragging
  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging && timelineRef.current) {
      const timelineRect = timelineRef.current.getBoundingClientRect();
      const clickPosition = event.clientX - timelineRect.left;
      const newTime = Math.max(
        0,
        Math.min((clickPosition / timelineRect.width) * duration, duration)
      );
      dispatch(setCurrentTime(newTime));
    }
  };

  // Handles the mouse up event to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Clean up mouse move and up listeners when the component unmounts or dragging ends
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // Set the scrubber position based on the currentTime
  const scrubberStyle = {
    left: `${(currentTime / duration) * 100}%`,
  };

  // Adjust markers to be evenly spaced within the timeline width
  const timeMarkersCount = Math.ceil(duration / 30);
  const timeMarkerInterval = duration / timeMarkersCount;

  const markerStyle = (time: number) => ({
    left: `${(time / duration) * 100}%`,
  });

  // Create time markers at regular intervals
  const timeMarkers = Array.from({ length: timeMarkersCount }, (_, i) => i * timeMarkerInterval + 1);

  return (
    <div className="relative w-full">
      {/* Timeline Container */}
      <div
        ref={timelineRef}
        className="relative w-full h-6 bg-green-600 rounded-md overflow-hidden"
      >
        {/* Time Markers */}
        {timelineRef.current &&
          timeMarkers.map((time) => (
            <div
              key={time}
              className="absolute top-0 h-full border-l border-yellow-500 opacity-50"
              style={markerStyle(time)}
            />
          ))}

        {/* Render Clips */}
        {clips.map((clip, index) => (
          <div
            key={index}
            className="absolute top-0 h-full bg-blue-400 opacity-50 rounded-md"
            style={{
              left: `${(clip.startTime / duration) * 100}%`,
              width: `${((clip.endTime - clip.startTime) / duration) * 100}%`,
            }}
          />
        ))}

        {/* Scrubber */}
        <div
          style={scrubberStyle}
          className="absolute top-0 w-1 h-full bg-red-500 rounded cursor-pointer"
          onMouseDown={handleMouseDown}
        />
      </div>

      {/* Seconds Display */}
      <div className="relative w-full mt-2">
        {timeMarkers.map((time) => (
          <span
            key={time}
            className="absolute text-xs text-gray-600 -translate-x-1/2"
            style={markerStyle(time)}
          >
            {Math.floor(time)}
          </span>
        ))}
      </div>
      {zoomData.map((data,index)=>
      {
          return (

              <div key={index}  className="absolute h-12  bg-green-900 border-[1px] tooltip border-slate-900 cursor-pointer"  style={{width:`${data.end_time-data.start_time}`,left:`${data?.start_time/duration*100}`}}>
            <span className="tooltip" data-tip={data?.input_video} key={index}></span>
            </div>)
          
        
      })}
    </div>
  );
};

export default Timeline;
