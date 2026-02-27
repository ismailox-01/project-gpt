import { createSlice } from '@reduxjs/toolkit';

const contentSlice = createSlice({
  name: 'content',
  initialState: { items: [] },
  reducers: {
    setContent: (state, action) => {
      state.items = action.payload;
    }
  }
});

export const { setContent } = contentSlice.actions;
export default contentSlice.reducer;
