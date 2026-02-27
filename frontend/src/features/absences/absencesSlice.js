import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchAbsences = createAsyncThunk('absences/fetch', async (user) => api.listAbsences(user));
export const addAbsence = createAsyncThunk('absences/add', async ({ user, payload }) =>
  api.createAbsence(user, payload)
);

const absencesSlice = createSlice({
  name: 'absences',
  initialState: { items: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAbsences.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addAbsence.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  }
});

export default absencesSlice.reducer;
