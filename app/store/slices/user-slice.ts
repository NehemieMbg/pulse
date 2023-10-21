import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    latestChanges: {},
  },
  reducers: {
    setChanges: (state, action) => {
      state.latestChanges = action.payload;
    },
  },
});

export const { setChanges } = userSlice.actions;

export default userSlice.reducer;
