import {createSlice} from "@reduxjs/toolkit";

type initialStateType = {
  userName: string;
  state: boolean;
};

const storeAuth = localStorage.getItem("auth");

const initialState: initialStateType = {
  userName: "",
  state: storeAuth === "true" ? true : false,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    _setAuth: (state, action) => {
      state.userName = action.payload.userName;
      state.state = action.payload.state;
    },
    _removeAuth: (state) => {
      state.userName = "";
      state.state = false;
    },
  },
});

export const {_setAuth, _removeAuth} = auth.actions;
export default auth.reducer;
