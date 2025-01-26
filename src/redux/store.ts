import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./features/LoadingSlice";
import videoReducer from "./features/videoSlice";
export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    video: videoReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;