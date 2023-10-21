import { configureStore } from '@reduxjs/toolkit';

import navigationSlice from './slices/navigation-slice';
import userSlice from './slices/user-slice';
import notificationSlice from './slices/notification-slice';

export const store = configureStore({
  reducer: {
    navigation: navigationSlice,
    user: userSlice,
    notifications: notificationSlice,
  },
});

export default store;
