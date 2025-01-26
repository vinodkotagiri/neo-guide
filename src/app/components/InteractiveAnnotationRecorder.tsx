'use client'
import React, { useState, useRef, useEffect } from 'react';

const InteractiveScreenRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [annotations, setAnnotations] = useState<{ x: number; y: number; text: string }[]>([]);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const annotationOverlayRef = useRef<HTMLDivElement | null>(null);
  const [isAnnotating, setIsAnnotating] = useState(false); // Control annotation mode

  useEffect(() => {
    return () => {
      // Clean up the stream and media recorder when component unmounts
      if (screenStream) {
        const tracks = screenStream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [screenStream]);

  const startScreenRecording = async () => {
    try {
      // Ask the user to select a screen/window for recording
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      setScreenStream(stream);

      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (event) => {
        const videoBlob = event.data;
        const videoUrl = URL.createObjectURL(videoBlob);
        setRecordedVideoUrl(videoUrl);
      };
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing screen:', err);
    }
  };

  const stopScreenRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
    setIsRecording(false);
  };

  const togglePauseRecording = () => {
    if (mediaRecorder) {
      if (isPaused) {
        mediaRecorder.resume();
      } else {
        mediaRecorder.pause();
      }
      setIsPaused(!isPaused);
    }
  };

  const handleAddAnnotation = (e: React.MouseEvent) => {
    if (isRecording && !isPaused && isAnnotating) {
      const x = e.clientX;
      const y = e.clientY;
      const annotationText = prompt('Enter annotation text:') || '';
      if (annotationText) {
        setAnnotations((prev) => [...prev, { x, y, text: annotationText }]);
      }
    }
  };

  const handleSaveRecording = () => {
    if (recordedVideoUrl) {
      const a = document.createElement('a');
      a.href = recordedVideoUrl;
      a.download = 'screen_recording.mp4';
      a.click();
    }
  };

  const toggleAnnotationMode = () => {
    setIsAnnotating((prev) => !prev);
  };

  return (
    <div>
      <h1>Screen Recording with Annotations</h1>

      {/* Button to Start/Stop Recording */}
      <div>
        <button onClick={() => (isRecording ? stopScreenRecording() : startScreenRecording())}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
        {isRecording && (
          <button onClick={togglePauseRecording}>
            {isPaused ? 'Resume Recording' : 'Pause Recording'}
          </button>
        )}
        {recordedVideoUrl && <button onClick={handleSaveRecording}>Save Recording</button>}
      </div>

      {/* Annotation Mode Button (Fixed Position) */}
      <button
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          zIndex: 9999,
          backgroundColor: isAnnotating ? 'red' : 'green',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          cursor: 'pointer',
        }}
        onClick={toggleAnnotationMode}
      >
        {isAnnotating ? 'Stop Annotating' : 'Start Annotating'}
      </button>

      {/* Screen Recording Video */}
      <div style={{ position: 'relative' }}>
        <video
          controls
          width="100%"
          height="auto"
          src={recordedVideoUrl || ''}
          autoPlay
          muted
          style={{ width: '100%', height: 'auto' }}
        ></video>

        {/* Annotation Overlay */}
        <div
          ref={annotationOverlayRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: isAnnotating ? 'auto' : 'none', // Enable/Disable annotation overlay
          }}
          onClick={handleAddAnnotation}
        >
          {annotations.map((annotation, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: annotation.x,
                top: annotation.y,
                backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark background for better contrast
                color: 'white', // Light text color
                padding: '5px 10px',
                borderRadius: '3px',
                pointerEvents: 'auto', // Allow annotation click to interact
                fontSize: '14px',
              }}
            >
              {annotation.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveScreenRecorder;