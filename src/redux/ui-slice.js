import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { notification: null , taskId: null,plan:{} },
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
    setPlan(state, action) {
      state.plan = action.payload
    },
    clearPlan(state, action) {
      state.plan = action.payload
    },
  },
});

export const {showNotification,setTaskId,setPlan,clearPlan} = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
