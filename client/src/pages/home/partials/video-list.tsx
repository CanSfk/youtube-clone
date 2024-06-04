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
      const response = await fetch('http://localhost:8085/video/list', {
        credentials: 'include',
      });

      const data = await response.json();

      setAllVideo(data);
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
          postedTime={12}
          accountName={vd.account_name}
          height={height}
        />
      ))}
    </section>
  );
};

export default VideoList;
