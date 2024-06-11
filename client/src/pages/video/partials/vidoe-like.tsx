import React, { FormEvent, useEffect, useState } from 'react';
import { MyButton } from '../../../components';

interface VideLikeProps {
  videoUrl: string;
  likeStatus: boolean;
}

export const VideoLike: React.FC<VideLikeProps> = ({ videoUrl, likeStatus }) => {
  const [buttonState, setButtonState] = useState<boolean>(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    formData.append('video_url', videoUrl);

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/video/like`, {
      credentials: 'include',
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const resultRes = await response.json();
      setButtonState(resultRes.result);
    } else console.log('error');
  };

  useEffect(() => {
    setButtonState(likeStatus);
  }, [likeStatus]);

  return (
    <form onSubmit={onSubmit}>
      <MyButton text={buttonState ? 'Beğen' : 'Beğenme'} color='blue' styleType='outline' />
    </form>
  );
};

export default VideoLike;
