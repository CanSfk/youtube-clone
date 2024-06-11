import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  userName: string;
  fullName: string;
  profileImageName: string;
  state: boolean;
};

const storeAuth = localStorage.getItem('auth');
const storeUserName = localStorage.getItem('userName');
const storeFullName = localStorage.getItem('fullName');
const storeCoverImageName = localStorage.getItem('profileImageName');

const initialState: initialStateType = {
  userName: storeUserName ?? '',
  fullName: storeFullName ?? '',
  profileImageName: storeCoverImageName ?? '',
  state: storeAuth === 'true' ? true : false,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    _setAuth: (state, action) => {
      state.userName = action.payload.userName;
      state.state = action.payload.state;
      state.profileImageName = action.payload.profileImageName;
      state.fullName = action.payload.fullName;

      localStorage.setItem('auth', String(action.payload.state));
      localStorage.setItem('userName', action.payload.userName);
      localStorage.setItem('fullName', action.payload.fullName);
      localStorage.setItem('profileImageName', action.payload.profileImageName);
    },
    _removeAuth: (state) => {
      state.userName = '';
      state.fullName = '';
      state.state = false;
      state.profileImageName = '';

      localStorage.setItem('auth', '');
      localStorage.setItem('userName', '');
      localStorage.setItem('fullName', '');
      localStorage.setItem('profileImageName', '');
    },
  },
});

export const { _setAuth, _removeAuth } = auth.actions;
export default auth.reducer;
