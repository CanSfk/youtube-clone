import { NavLink } from 'react-router-dom';
import { MenuIcon } from '../../../../assets/icons';
import { setMenu } from '../../../../stores/menu/actions';
import Account from './account';
import Search from './search';
import { MyLogo } from '../../../../components/my-logo/my-logo';

export const Navbar = () => {
  return (
    <div className='px-4 flex items-center justify-between sticky top-0 bg-dark-theme-black z-[101]'>
      <div className='flex items-center'>
        <button
          type='button'
          onClick={() => setMenu('sidebar-menu')}
          className='text-white p-2 rounded-full transition-color duration-200 hover:bg-dark-theme-soft-black'
        >
          <MenuIcon fill='white' />
        </button>

        <div className='flex gap-1 py-[14px] pr-[14px] pl-[16px]'>
          <NavLink to='/'>
            <MyLogo width={90} height={32} />
          </NavLink>
        </div>
      </div>

      <Search />

      <Account />
    </div>
  );
};

export default Navbar;
