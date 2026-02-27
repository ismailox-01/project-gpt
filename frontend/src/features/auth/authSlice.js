import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

const saved = JSON.parse(localStorage.getItem('ofppt-sm-session') || 'null');

export const login = createAsyncThunk('auth/login', async (payload) => api.login(payload));
export const registerTrainee = createAsyncThunk('auth/registerTrainee', async (payload) =>
  api.registerTrainee(payload)
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: saved?.token || '',
    user: saved?.user || null,
    status: 'idle',
    error: ''
  },
  reducers: {
    logout: (state) => {
      state.token = '';
      state.user = null;
      localStorage.removeItem('ofppt-sm-session');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem('ofppt-sm-session', JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Connexion échouée';
      })
      .addCase(registerTrainee.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(registerTrainee.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(registerTrainee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Inscription échouée';
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
