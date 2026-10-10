import { createSlice } from '@reduxjs/toolkit';

const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

const authSlice = createSlice({
  name: 'auth',
  initialState: { currentUser, isLoggedIn: Boolean(currentUser) },
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
      localStorage.setItem('isLoggedIn', 'true');
    },
    register: (state, action) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push(action.payload);
      localStorage.setItem('users', JSON.stringify(users));
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
      localStorage.setItem('isLoggedIn', 'true');
    },
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      localStorage.removeItem('currentUser');
      localStorage.setItem('isLoggedIn', 'false');
    }
  }
});

export const { login, register, logout } = authSlice.actions;
export default authSlice.reducer;
