import {MenuIcon, YoutubeIcon} from "../../../../assets/icons";
import {setMenu} from "../../../../stores/menu/actions";
import Account from "./account";
import Search from "./search";

export const Navbar = () => {
  return (
    <div className='px-4 flex items-center justify-between sticky top-0 bg-dark-theme-black'>
      <div className='flex items-center'>
        <button
          type='button'
          onClick={() => setMenu("sidebar-menu")}
          className='text-white p-2 rounded-full transition-color duration-200 hover:bg-dark-theme-soft-black'
        >
          <MenuIcon fill='white' />
        </button>

        <div className='flex gap-1 py-[18px] pr-[14px] pl-[16px]'>
          <button
            type='button'
            className='w-[90px]'
          >
            <YoutubeIcon
              viewBox='0 0 90 20'
              width='100%'
              height='100%'
            />
          </button>

          <span className='text-custom-gray text-[10px] -mt-[8px]'>TR</span>
        </div>
      </div>

      <Search />

      <Account />
    </div>
  );
};

export default Navbar;
