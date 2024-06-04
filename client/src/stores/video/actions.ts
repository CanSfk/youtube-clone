import {Video, _setAllVideo, _setVideo} from ".";
import {store} from "..";

export const setVideo = (video: Video) => store.dispatch(_setVideo({video: video}));
export const setAllVideo = (videos: Video[]) => store.dispatch(_setAllVideo({videos: videos}));
