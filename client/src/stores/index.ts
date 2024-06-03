import {configureStore} from "@reduxjs/toolkit";
import menu from "./menu";
import modal from "./modal";
import auth from "./auth";

export const store = configureStore({
  reducer: {
    menu,
    modal,
    auth
  },
});
