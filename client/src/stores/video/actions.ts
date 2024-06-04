import { Video, Comment, _setAllComment, _setAllVideo, _setComment, _setVideo } from '.';
import { store } from '..';

export const setVideo = (video: Video) => store.dispatch(_setVideo({ video: video }));
export const setAllVideo = (videos: Video[]) => store.dispatch(_setAllVideo({ videos: videos }));
export const setComment = (comment: Comment) => store.dispatch(_setComment({ comment: comment }));
export const setAllComment = (comments: Comment[]) => store.dispatch(_setAllComment({ comments: comments }));
