import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setCurrentTime, setDuration, setTempData } from '@/redux/features/videoSlice';
import { Stage, Layer, Rect } from 'react-konva';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });


interface VideoPlayerProps {
  playerRef: React.RefObject<unknown>;
}

interface OnProgressProps {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ playerRef }) => {
  const { isPlaying,zoom,zooming,url:src } = useAppSelector((state) => state.video);
  const stageRef = useRef(null); // Ref for the stage
  const playerContainerRef = useRef(null); // Ref for the container of the video player

  const [isDrawing, setIsDrawing] = useState(false); // To track drawing state
  const [startX, setStartX] = useState(0); // Starting x position
  const [startY, setStartY] = useState(0); // Starting y position
  const [rectangles, setRectangles] = useState<{ x: number, y: number, width: number, height: number }[]>([]); // Store all rectangles
  const [currentRect, setCurrentRect] = useState<{ x: number, y: number, width: number, height: number } | null>(null); // Current drawing rectangle
  const [roi, setRoi] = useState<{ x: number, y: number, width: number, height: number } | null>(null); // Store the ROI
  const dispatch = useAppDispatch();

  useEffect(()=>{
    if(zoom && roi){
      const { x, y, width, height } = roi;
      dispatch(setTempData({input_video:src, zoom_factor: zoom, roi: [x, y, width, height] }))
    }
  },[zoom,roi])

  useEffect(()=>{
    if(!zooming){
      setRectangles([])
    }
  },[zooming])
  useEffect(() => {
    // Dynamically calculate the player size to set the stage size
    const playerContainer = playerContainerRef.current;
    if (playerContainer) {
      const { width, height } = playerContainer.getBoundingClientRect();
      // Set the stage width and height to match the player size
      if (stageRef.current) {
        const stage = stageRef.current;
        stage.width(width);
        stage.height(height);
      }
    }
  }, []); // Initial calculation for player size

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if(zooming){
      const stage = stageRef.current;
      const mousePos = stage.getPointerPosition();
      
      setStartX(mousePos.x);
      setStartY(mousePos.y);
      setIsDrawing(true);
      setCurrentRect({ x: mousePos.x, y: mousePos.y, width: 0, height: 0 }); // Start drawing the rectangle
      setRectangles([]); // Clear previous rectangles
    }
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing) return;
    const stage = stageRef.current;
    const mousePos = stage.getPointerPosition();

    const width = mousePos.x - startX;
    const height = mousePos.y - startY;

    setCurrentRect({ x: startX, y: startY, width, height });
  };

  const handleMouseUp = () => {
    if (currentRect) {
      // Add the new rectangle to the rectangles array
      setRectangles([...rectangles, currentRect]);

      // Update the ROI state without scaling
      setRoi({ x: currentRect.x, y: currentRect.y, width: currentRect.width, height: currentRect.height });
    }

    setIsDrawing(false);
    setCurrentRect(null); // Reset current rectangle
  };

  const handleDuration = (duration: number) => {
    dispatch(setDuration(duration));
  };

  const handleProgress = (state: OnProgressProps) => {
    dispatch(setCurrentTime(state.playedSeconds));
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-md" ref={playerContainerRef}>
      {/* Main Player */}
      <ReactPlayer
        ref={playerRef}
        url={src}
        playing={isPlaying}
        width="100%"
        height="100%"
        onDuration={handleDuration}
        onProgress={handleProgress}
        // This is just to play the video; no zoom on the main player
      />

      {/* Stage for drawing ROI */}
      <Stage
        ref={stageRef}
        className="absolute top-0 left-0 z-50"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {rectangles.map((rect, index) => (
            <Rect
              key={index}
              x={rect.x}
              y={rect.y}
              width={rect.width}
              height={rect.height}
              fill="rgba(0, 0, 255, 0.5)" // Semi-transparent blue fill
              stroke="blue"
              strokeWidth={2}
              draggable // Make the rectangle draggable
              onDragEnd={(e) => {
                const newRectangles = [...rectangles];
                newRectangles[index] = {
                  ...newRectangles[index],
                  x: e.target.x(),
                  y: e.target.y(),
                };
                setRectangles(newRectangles);
              }}
            />
          ))}

          {currentRect && (
            <Rect
              x={currentRect.x}
              y={currentRect.y}
              width={currentRect.width}
              height={currentRect.height}
              fill="rgba(0, 0, 255, 0.5)" // Semi-transparent blue fill
              stroke="blue"
              strokeWidth={2}
            />
          )}
        </Layer>
      </Stage>

      {/* Display the ROI */}
      {roi && (
        <div className="absolute top-0 left-0 p-2 text-white bg-black bg-opacity-50">
          <p>ROI: X: {roi.x.toFixed(2)}, Y: {roi.y.toFixed(2)}, Width: {roi.width.toFixed(2)}, Height: {roi.height.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
