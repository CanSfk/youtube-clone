import { FormEvent, useState } from 'react';
import { AccountImage, MyButton, MyInput } from '../../../components';
import { useAuth } from '../../../stores/auth/hooks';
import { setComment } from '../../../stores/video/actions';

type CommentDataType = {
  message: string;
};

type VideoCommentProps = {
  videoUrl: string;
};

export const VideoComment: React.FC<VideoCommentProps> = ({ videoUrl }) => {
  const [commentData, setCommentData] = useState<CommentDataType>({ message: '' });
  const { userName, profileImageName } = useAuth();

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

    if (response.ok) {
      setComment(await response.json());
      setCommentData({ message: '' });
    } else console.log('Failed the fetch comment data', response.status);
  };

  return (
    <div className='flex gap-2'>
      <AccountImage imageName={profileImageName} size='sm' />
      <div className='flex-1'>
        <form onSubmit={onSubmit}>
          <div className='flex flex-col gap-3'>
            <MyInput
              placeholder='Yorum ekleyin...'
              className='w-full'
              value={commentData.message}
              onChange={(e) => setCommentData({ message: e.target.value })}
            />

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
