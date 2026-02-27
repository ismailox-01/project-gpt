import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchContent = createAsyncThunk('content/fetch', async () => api.listContent());
export const addContent = createAsyncThunk('content/add', async ({ user, payload }) =>
  api.createContent(user, payload)
);

const contentSlice = createSlice({
  name: 'content',
  initialState: { items: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addContent.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  }
});

export default contentSlice.reducer;
