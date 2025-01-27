import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: 'loader',
  initialState: { isLoading: false, status: 'loading', percentage: 0 },
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setLoadingParams:(state,action)=>{
      if(action.payload.status){
        state.status=action.payload.status
      }
      if(action.payload.percentage){
        state.percentage=action.payload.percentage
      }
    }
  },
});

export const { setLoading,setLoadingParams } = loaderSlice.actions;
export default loaderSlice.reducer