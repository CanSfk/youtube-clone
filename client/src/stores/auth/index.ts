import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  userName: string;
  state: boolean;
};

const storeAuth = localStorage.getItem('auth');
const storeUserName = localStorage.getItem('userName');

const initialState: initialStateType = {
  userName: storeUserName ?? '',
  state: storeAuth === 'true' ? true : false,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    _setAuth: (state, action) => {
      state.userName = action.payload.userName;
      state.state = action.payload.state;

      localStorage.setItem('auth', String(action.payload.state));
      localStorage.setItem('userName', action.payload.userName);
    },
    _removeAuth: (state) => {
      state.userName = '';
      state.state = false;

      localStorage.setItem('auth', '');
      localStorage.setItem('userName', 'false');
    },
  },
});

export const { _setAuth, _removeAuth } = auth.actions;
export default auth.reducer;
