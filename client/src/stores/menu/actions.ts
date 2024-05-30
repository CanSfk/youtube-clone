import {_removeMenu, _setMenu} from ".";
import {store} from "..";

export const setMenu = (menuName: string) => store.dispatch(_setMenu(menuName));
export const removeMenu = () => store.dispatch(_removeMenu());
