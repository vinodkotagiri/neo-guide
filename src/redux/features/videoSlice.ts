import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// const url='https://converter-effy.s3.ap-southeast-1.amazonaws.com/dubvideo.mp4'
interface ZoomData {
  input_video: string;
  start_time: number;
  end_time: number;
  zoom_factor: number;
  roi: [number, number, number, number];
}

interface videoState {
  url: string;
  isPlaying: boolean;
  zoom: number;
  zooming: boolean;
  tempData: Partial<ZoomData>; // Allow partial ZoomData
  zoomData: ZoomData[];
  duration: number;
  currentTime: number;
  clips: { startTime: number; endTime: number }[];
}

const initialState: videoState = {
  url: '',
  isPlaying: false,
  zoom: 1,
  zooming: false,
  zoomData: [],
  duration: 0,
  currentTime: 0,
  clips: [{ startTime: 0, endTime: 0 }],
  tempData: {},
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload;
    },
    setZoomData: (state) => {
      if (state.tempData.input_video && state.tempData.start_time) {
        // Push tempData to zoomData only if it has essential fields
        state.zoomData = [...state.zoomData, state.tempData as ZoomData];
        state.tempData = {}; // Reset tempData after saving it
      }
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setClips: (state, action: PayloadAction<{ startTime: number; endTime: number }[]>) => {
      state.clips = action.payload;
    },
    setZooming: (state, action: PayloadAction<boolean>) => {
      state.zooming = action.payload;
    },
    setTempData: (state, action: PayloadAction<Partial<ZoomData>>) => {
      // Merge the incoming tempData with the existing one
      state.tempData = { ...state.tempData, ...action.payload };
    },
    setVideoUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
  }
});

export const {
  setVideoUrl,
  setClips,
  setCurrentTime,
  setDuration,
  setIsPlaying,
  setZoom,
  setZoomData,
  setZooming,
  setTempData
} = videoSlice.actions;

export default videoSlice.reducer;
