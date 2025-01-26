import { createSlice } from "@reduxjs/toolkit";
interface videoState {
  url:string;
  isPlaying: boolean;
  zoom: number;
  zooming:boolean;
  tempData: unknown;
  zoomData: Array<{
    input_video: string;
    start_time: number;
    end_time: number;
    zoom_factor: number;
    roi: [number, number, number, number];
  }>;
  duration: number;
  currentTime: number;
  clips: Array<{ startTime: number; endTime: number }>;
}

const initialState:videoState= {
  url:'https://converter-effy.s3.ap-southeast-1.amazonaws.com/dubvideo.mp4',
  isPlaying: false,
  zoom: 1,
  zooming:false,
  zoomData: [],
  duration: 0,
  currentTime: 0,
  clips: [{ startTime: 0, endTime: 0 }],
  tempData: {}
}
const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setZoom: (state, action) => {
      state.zoom = action.payload;
    },
    setZoomData: (state) => {
      state.zoomData = [...state.zoomData, state.tempData];
      state.tempData={}
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setClips: (state, action) => {
      state.clips = action.payload;
    },
    setZooming: (state, action) => {
      state.zooming = action.payload
    },
    setTempData: (state, action) => {
      for(let key in action.payload) state.tempData[key]=action.payload[key]
    }
  }
});

export const { setClips, setCurrentTime, setDuration, setIsPlaying, setZoom, setZoomData,setZooming,setTempData } = videoSlice.actions;
export default videoSlice.reducer;
