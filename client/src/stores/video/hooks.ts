import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "..";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useVideo = () => useTypedSelector((state) => state.video);
