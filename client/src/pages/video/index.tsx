import { useParams } from 'react-router-dom';
import FrontEndLayout from '../../layouts/front-end/layout';
import { useEffect, useState } from 'react';
import { MyButton } from '../../components';
import VideoComment from './partials/video-comment';
import CommentList from './partials/comment-list';
import { setAllComment } from '../../stores/video/actions';

interface Video {
  video_url: string;
  video_title: string;
  video_description: string;
  video_cover_image_name: string;
  account_name: string;
}

interface Comment {
  comment: string;
  account_name: string;
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
                <div className='w-10 h-10 min-w-9 min-h-9 rounded-full overflow-hidden relative'>
                  <picture className='absolute inset-0'>
                    <source type='image/webp' srcSet={`${import.meta.env.VITE_BASE_URL}/static/uploads/images/sm-${video.video_cover_image_name}`} />

                    <img
                      src={`${import.meta.env.VITE_BASE_URL}/static/uploads/images/sm-${video.video_cover_image_name}`}
                      alt='Youtube clone image'
                      className='w-full h-full object-cover'
                    />
                  </picture>
                </div>

                <div className='flex flex-col'>
                  <h2 className='text-dark-theme-white'>{video.account_name}</h2>
                  <span className='text-xs text-dark-theme-gray'>400 B abone</span>
                </div>
              </div>

              <MyButton text='Abone ol' color='yellow' styleType='outline' />
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
