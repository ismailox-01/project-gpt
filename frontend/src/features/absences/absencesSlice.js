import { createSlice } from '@reduxjs/toolkit';

const absencesSlice = createSlice({
  name: 'absences',
  initialState: { items: [] },
  reducers: {
    setAbsences: (state, action) => {
      state.items = action.payload;
    }
  }
});

export const { setAbsences } = absencesSlice.actions;
export default absencesSlice.reducer;
