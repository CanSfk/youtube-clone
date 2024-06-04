import { FormEvent, useState } from 'react';
import { MyButton, MyInput } from '../../../components';
import { useAuth } from '../../../stores/auth/hooks';

type CommentDataType = {
  message: string;
};

type VideoCommentProps = {
  videoUrl: string;
};

export const VideoComment: React.FC<VideoCommentProps> = ({ videoUrl }) => {
  const [commentData, setCommentData] = useState<CommentDataType>({ message: '' });
  const { userName } = useAuth();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('comment', commentData.message);
    formData.append('video_url', videoUrl);
    formData.append('user_name', userName);

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/video/comment`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    console.log(await response.json());
  };

  return (
    <div className='flex gap-2'>
      <div>
        <img
          id='img'
          draggable='false'
          className='rounded-full min-w-10 min-h-10 h-10 w-10'
          alt='Avatar resmi'
          src='https://yt3.ggpht.com/yti/ANjgQV_XxLV3Z6SdxWjxmWKjz2nYaNqv3I8X_QX8q3Uwaj8=s88-c-k-c0x00ffffff-no-rj'
        />
      </div>
      <div className='flex-1'>
        <form onSubmit={onSubmit}>
          <div className='flex flex-col gap-3'>
            <MyInput placeholder='Yorum ekleyin...' className='w-full' onChange={(e) => setCommentData({ message: e.target.value })} />

            <div className='ml-auto'>
              <MyButton
                type='submit'
                color='green'
                styleType='outline'
                text='Yorum Yap'
                disabled={commentData?.message === ''}
                className={`${commentData.message === '' && 'opacity-60'}`}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoComment;
