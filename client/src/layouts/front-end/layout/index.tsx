import { ReactNode, useEffect } from 'react';
import Navbar from './navbar';
import { Sidebar } from './sidebar';
import { useMenu } from '../../../stores/menu/hooks';
import { removeMenu } from '../../../stores/menu/actions';
import classNames from 'classnames';
import Suggestionbar from './suggestionbar';
import Modal from '../../../modals';
import { useModal } from '../../../stores/modal/hooks';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export const FrontEndLayout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const { modalName } = useModal();
  const { menuName } = useMenu();

  useEffect(() => {
    if (menuName !== null || modalName !== '') document.documentElement.style.overflow = 'hidden';
    else document.documentElement.style.overflowY = 'auto';
  }, [menuName, modalName]);

  return (
    <>
      <div className='w-full min-h-[2000px] bg-dark-theme-black text-dark-theme-white flex'>
        <div className='flex-1'>
          <Navbar />
          <div className='flex'>
            <Sidebar />
            <div className='w-full h-full'>
              {location.pathname === '/' && <Suggestionbar />}
              <main className={`px-6 ${location.pathname === '/' ? 'pt-20' : 'pt-2'}`}>{children}</main>
            </div>
          </div>
        </div>
        {(menuName !== null || modalName !== '') && <div className='w-[15px] bg-transparent ' />}

        <div
          onClick={() => removeMenu()}
          className={classNames('fixed inset-0 bg-[rgba(0,0,0,.4)] z-[200] transition-all duration-200', {
            'opacity-100 visible': menuName !== null,
            'opacity-0 invisible': menuName === null,
          })}
        />
      </div>
      {modalName != '' && <Modal />}
    </>
  );
};

export default FrontEndLayout;
