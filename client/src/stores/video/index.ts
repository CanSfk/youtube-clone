import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Video {
  video_title: string;
  video_url: string;
  video_description: string;
  video_cover_image_name: string;
  account_name: string;
}

interface VideoState {
  videos: Video[];
}

const initialState: VideoState = {
  videos: [],
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
  },
});

export const { _setVideo, _setAllVideo } = video.actions;

export default video.reducer;
