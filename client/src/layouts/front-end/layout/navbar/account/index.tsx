import { useEffect, useState } from 'react';
import { CameraIcon, CloseIconDoor, NotificationIcon } from '../../../../../assets/icons';
import { removeAuth } from '../../../../../stores/auth/actions';
import { NavLink } from 'react-router-dom';
import { AccountImage } from '../../../../../components';
import { useAuth } from '../../../../../stores/auth/hooks';

export const Account = () => {
  const { profileImageName } = useAuth();
  const [showPopover, setShowPopover] = useState<boolean>(false);

  const logout = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (response.ok) removeAuth();
    else console.log('Failed the logout', response.status);
  };

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
        <button onClick={() => setShowPopover((state) => !state)}>
          <AccountImage imageName={profileImageName} />
        </button>

        {showPopover && (
          <div className='absolute right-0 top-full p-2'>
            <div className='py-2 bg-dark-theme-extra-soft-black rounded-lg w-[300px] select-none'>
              <NavLink
                to='/'
                onClick={() => {
                  logout();
                  setShowPopover(false);
                }}
                className='flex w-full items-center gap-3 px-3 py-2 transition duration-200 hover:bg-dark-theme-primary-black'
              >
                <CloseIconDoor />
                <p className='w-max text-[14px]'>Cıkış Yap</p>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
