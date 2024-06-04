import { useState } from 'react';
import { MyButton, MyInput } from '../../../components';

type CommentDataType = {
  message: string;
};

export const VideoComment = () => {
  const [commentData, setCommentData] = useState<CommentDataType>({ message: '' });

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
        <div className='flex flex-col gap-3'>
          <form>
            <MyInput placeholder='Yorum ekleyin...' className='w-full' onChange={(e) => setCommentData({ message: e.target.value })} />
          </form>

          <div className='ml-auto'>
            <MyButton
              color='green'
              styleType='outline'
              text='Yorum Yap'
              disabled={commentData?.message === ''}
              className={`${commentData.message === '' && 'opacity-60'}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoComment;
