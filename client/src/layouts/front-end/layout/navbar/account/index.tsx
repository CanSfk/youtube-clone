import { useEffect, useState } from 'react';
import { CameraIcon, CloseIconDoor, NotificationIcon } from '../../../../../assets/icons';

export const Account = () => {
  const [showPopover, setShowPopover] = useState<boolean>(false);

  const changePopoverState = (e: MouseEvent) => {
    const popover = document.querySelector('#account_popover');

    if (!popover?.contains(e.target as Node)) setShowPopover(false);
  };

  useEffect(() => {
    !showPopover && window.addEventListener('click', changePopoverState);

    return () => {
      window.removeEventListener('click', changePopoverState);
    };
  }, []);

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

      <div id='account_popover' className='px-2 grid place-items-center relative'>
        <button onClick={() => setShowPopover((state) => !state)} className='relative h-8 w-8 rounded-full overflow-hidden'>
          <picture className='absolute inset-0'>
            <source type='image/webp' srcSet='https://yt3.ggpht.com/yti/ANjgQV_XxLV3Z6SdxWjxmWKjz2nYaNqv3I8X_QX8q3Uwaj8=s88-c-k-c0x00ffffff-no-rj' />

            <img
              src='https://yt3.ggpht.com/yti/ANjgQV_XxLV3Z6SdxWjxmWKjz2nYaNqv3I8X_QX8q3Uwaj8=s88-c-k-c0x00ffffff-no-rj'
              alt='Youtube clone image'
              className='w-full h-full object-cover'
            />
          </picture>
        </button>

        {showPopover && (
          <div className='absolute right-0 top-full p-2'>
            <div className='py-2 bg-dark-theme-extra-soft-black rounded-lg w-[300px] select-none'>
              <div className='flex items-center gap-3 px-3 py-2 transition duration-200 hover:bg-dark-theme-primary-black'>
                <CloseIconDoor />
                <p className='w-max text-[14px]'>Cıkış Yap</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
