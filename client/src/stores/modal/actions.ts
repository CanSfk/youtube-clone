import {_removeModal, _setModal} from ".";
import {store} from "..";

export const setModal = (modalName: string, modalData: unknown) => store.dispatch(_setModal({modalName, modalData}));

export const removeModal = () => store.dispatch(_removeModal());
