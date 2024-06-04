import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Video {
  video_title: string;
  video_url: string;
  video_description: string;
  video_cover_image_name: string;
  account_name: string;
}

export interface Comment {
  comment: string;
  account_name: string;
}

interface VideoState {
  videos: Video[];
  comments: Comment[];
}

const initialState: VideoState = {
  videos: [],
  comments: [],
};

const video = createSlice({
  name: 'video',
  initialState: initialState,
  reducers: {
    _setVideo: (state, action: PayloadAction<{ video: Video }>) => {
      state.videos.push(action.payload.video);
    },

    _setAllVideo: (state, action: PayloadAction<{ videos: Video[] }>) => {
      state.videos = action.payload.videos;
    },

    _setComment: (state, action: PayloadAction<{ comment: Comment }>) => {
      state.comments.push(action.payload.comment);
    },

    _setAllComment: (state, action: PayloadAction<{ comments: Comment[] }>) => {
      state.comments = action.payload.comments;
    },
  },
});

export const { _setVideo, _setAllVideo, _setComment, _setAllComment } = video.actions;

export default video.reducer;
