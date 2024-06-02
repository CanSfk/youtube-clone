import {configureStore} from "@reduxjs/toolkit";
import menu from "./menu";
import modal from "./modal";

export const store = configureStore({
  reducer: {
    menu,
    modal,
  },
});
