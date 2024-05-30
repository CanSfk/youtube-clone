import {useSelector} from "react-redux";

export const useMenu = () => useSelector((state: any) => state.menu);
