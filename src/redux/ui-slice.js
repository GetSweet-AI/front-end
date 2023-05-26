import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { notification: null , taskId: null },
  reducers: {
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    setTaskId(state, action) {
      state.taskId = action.payload
    },
  },
});

export const {showNotification,setTaskId} = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
