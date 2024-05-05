import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  menuName: null,
};

const menu = createSlice({
  name: "menu",
  initialState,
  reducers: {
    _setMenu: (state, action) => {
      state.menuName = action.payload;
      console.log(action.payload);
    },

    _removeMenu: (state) => {
      state.menuName = null;
    },
  },
});

export const {_setMenu, _removeMenu} = menu.actions;
export default menu.reducer;
