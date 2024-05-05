import {CameraIcon, NotificationIcon} from "../../../../../assets/icons";

export const Account = () => {
  return (
    <div className='flex items-center justify-end gap-3 w-[225px]'>
      <button className='w-10 h-10 grid place-items-center rounded-full hover:bg-dark-theme-soft-black'>
        <CameraIcon />
      </button>

      <button className='relative rounded-full grid place-items-center w-10 h-10  hover:bg-dark-theme-soft-black'>
        <NotificationIcon />
        <div className='absolute top-1.5 -right-0.5'>
          <div className='text-xs bg-youtube-red px-1 rounded-full font-[400]'>9+</div>
        </div>
      </button>

      <button className='px-2'>
        <img
          id='img'
          draggable='false'
          className='rounded-full min-w-8 min-h-8 h-8 w-8'
          alt='Avatar resmi'
          src='https://yt3.ggpht.com/yti/ANjgQV_XxLV3Z6SdxWjxmWKjz2nYaNqv3I8X_QX8q3Uwaj8=s88-c-k-c0x00ffffff-no-rj'
        />
      </button>
    </div>
  );
};

export default Account;
