import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeBrandID:null
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      return { message: action.payload };
    },
    clearMessage: () => {
      return { message: "" };
    },
    setActiveBrandEngagement:(state,action)=>{
      state.activeBrandID = action.payload
    },
    clearActiveBrandEngagement:(state,action)=>{
      state.activeBrandID = null
    }
  },
});

export const messageReducer = messageSlice.reducer;
export const { clearActiveBrandEngagement,setMessage, clearMessage,setActiveBrandEngagement } = messageSlice.actions;
// export default reducer;
