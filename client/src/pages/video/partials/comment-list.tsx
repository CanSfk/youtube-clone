import { AccountImage } from '../../../components';
import { useVideo } from '../../../stores/video/hooks';

export const CommentList = () => {
  const { comments } = useVideo();

  return (
    <>
      {(comments || []).map((cm, index) => (
        <div key={index} className='flex gap-4'>
          <AccountImage size='sm' imageName={cm.account_image_name} />

          <div className='flex-1 flex-col'>
            <div className='flex gap-2 items-center'>
              <span className='text-[13px]'>{cm.account_name}</span>
              <span className='text-xs text-dark-theme-gray'>6 day ago</span>
            </div>

            <div>
              <span className='text-sm'>{cm.comment}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CommentList;
