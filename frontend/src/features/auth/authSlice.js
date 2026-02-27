import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const login = createAsyncThunk('auth/login', async (payload) => {
  const { data } = await api.post('/auth/login', payload);
  return data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    user: null,
    status: 'idle',
    error: ''
  },
  reducers: {
    logout: (state) => {
      state.token = '';
      state.user = null;
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
      })
      .addCase(login.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Connexion échouée';
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
