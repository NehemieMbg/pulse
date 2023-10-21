import { createSlice } from '@reduxjs/toolkit';

const NotificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    newNotification: false,
  },
  reducers: {
    setNotification: (state) => {
      state.newNotification = true;
    },
    closeNotification: (state) => {
      state.newNotification = false;
    },
  },
});

export const { setNotification, closeNotification } =
  NotificationsSlice.actions;

export default NotificationsSlice.reducer;
