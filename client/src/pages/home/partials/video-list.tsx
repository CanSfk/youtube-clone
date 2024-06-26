import { useEffect, useState } from 'react';
import { MyVideoCard } from '../../../components';
import { useVideo } from '../../../stores/video/hooks';
import { setAllVideo } from '../../../stores/video/actions';

export const VideoList = () => {
  const { videos } = useVideo();
  const [height, setHeight] = useState<number>(200);
  const [videoCard, setVideoCard] = useState<HTMLElement | undefined>();

  const handleResize = () => {
    videoCard ? setHeight(Math.floor(videoCard.clientWidth * 56.2) / 100) : 200;
  };

  useEffect(() => {
    setVideoCard(document.getElementById('card-1') || undefined);

    (async () => {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/video/list`, {
        credentials: 'include',
      });

      if (response.ok) setAllVideo(await response.json());
      else console.log('Failed the fetch videos data', response.status);
    })();
  }, []);

  useEffect(() => {
    if (videoCard) {
      handleResize();

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [videoCard]);

  return (
    <section className='vide-card-list-grid gap-x-3 gap-y-8'>
      {(videos || []).map((vd, index) => (
        <MyVideoCard
          id={`card-${index}`}
          videoName={vd.video_url}
          key={index}
          imageName={`${import.meta.env.VITE_BASE_URL}/static/uploads/images/md-${vd.video_cover_image_name}`}
          title={vd.video_title}
          view={2.8}
          postedTime={vd.time_dif}
          accountName={vd.account_name}
          height={height}
          profileImageName={vd.profile_image_name}
        />
      ))}
    </section>
  );
};

export default VideoList;
