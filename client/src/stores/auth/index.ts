import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  userName: string;
  profileImageName: string;
  state: boolean;
};

const storeAuth = localStorage.getItem('auth');
const storeUserName = localStorage.getItem('userName');
const storeCoverImageName = localStorage.getItem('profileImageName');

const initialState: initialStateType = {
  userName: storeUserName ?? '',
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

      localStorage.setItem('auth', String(action.payload.state));
      localStorage.setItem('userName', action.payload.userName);
      localStorage.setItem('profileImageName', action.payload.profileImageName);
    },
    _removeAuth: (state) => {
      state.userName = '';
      state.state = false;
      state.profileImageName = '';

      localStorage.setItem('auth', '');
      localStorage.setItem('userName', 'false');
      localStorage.setItem('profileImageName', '');
    },
  },
});

export const { _setAuth, _removeAuth } = auth.actions;
export default auth.reducer;
