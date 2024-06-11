import { useParams } from 'react-router-dom';
import FrontEndLayout from '../../layouts/front-end/layout';
import { useEffect, useState } from 'react';
import { AccountImage } from '../../components';
import VideoComment from './partials/video-comment';
import CommentList from './partials/comment-list';
import { setAllComment } from '../../stores/video/actions';
import VideoLike from './partials/vidoe-like';
import Subscribers from './partials/subscribers';

interface Video {
  video_id: number;
  video_url: string;
  video_title: string;
  video_description: string;
  video_cover_image_name: string;
  account_id: number;
  account_name: string;
  profile_image_name: string;
}

interface Comment {
  comment: string;
  account_name: string;
  account_image_name: string;
}

export const Video = () => {
  const [video, setVideo] = useState<Video>();
  const { vName } = useParams();

  useEffect(() => {
    (async () => {
      const response: Response = await fetch(`${import.meta.env.VITE_BASE_URL}/video/show/${vName}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data: { video: Video; comments: Comment[] } = await response.json();
        setVideo(data.video);
        setAllComment(data.comments);

        await fetch(`${import.meta.env.VITE_BASE_URL}/user/history/${vName}`, {
          method: 'POST',
          credentials: 'include',
        });
      } else console.log('Failed the fetch video data', response.status);
    })();
  }, []);

  return (
    <FrontEndLayout>
      {video && (
        <div className='flex flex-col gap-3'>
          <video controls src={`${import.meta.env.VITE_BASE_URL}/static/uploads/videos/${video.video_url}`} className='w-full h-[600px]' />
          <h1 className='text-[20px] text-dark-theme-white'>{video.video_title}</h1>

          <div className='flex flex-col gap-6'>
            <div className='flex gap-10'>
              <div className='flex gap-4'>
                <AccountImage imageName={video.profile_image_name} />

                <div className='flex flex-col'>
                  <h2 className='text-dark-theme-white'>{video.account_name}</h2>
                  <span className='text-xs text-dark-theme-gray'>400 B abone</span>
                </div>
              </div>

              <div className='flex items-center gap-5'>
                <Subscribers accountId={video.account_id} />
                <VideoLike videoUrl={video.video_url} />
              </div>
            </div>

            <div className='p-3 rounded-lg bg-dark-theme-extra-soft-black'>
              <p className='text-dark-theme-white text-sm'>{video.video_description}</p>
            </div>

            <VideoComment videoUrl={vName as string} />

            <CommentList />
          </div>
        </div>
      )}
    </FrontEndLayout>
  );
};

export default Video;
