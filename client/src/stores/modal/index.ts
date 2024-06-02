import {createSlice} from "@reduxjs/toolkit";

type ModalProp = {
  modalName: string;
  modalData: unknown;
};

const initialState: ModalProp = {
  modalName: "",
  modalData: {},
};

const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    _setModal: (state, action) => {
      state.modalName = action.payload.modalName;
      state.modalData = action.payload.modalData;
    },

    _removeModal: (state) => {
      state.modalName = "";
      state.modalData = {};
    },
  },
});

export const {_setModal, _removeModal} = modal.actions;
export default modal.reducer;
