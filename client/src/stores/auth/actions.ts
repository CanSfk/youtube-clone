import { _removeAuth, _setAuth } from '.';
import { store } from '..';

export const setAuth = (userName: string, state: boolean) => store.dispatch(_setAuth({ userName: userName, state: state }));
export const removeAuth = () => store.dispatch(_removeAuth());
