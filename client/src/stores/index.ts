import {configureStore} from "@reduxjs/toolkit";
import menu from "./menu";
import modal from "./modal";
import auth from "./auth";
import video from "./video";

export const store = configureStore({
  reducer: {
    menu,
    modal,
    auth,
    video,
  },
});

export type RootState = ReturnType<typeof store.getState>;
