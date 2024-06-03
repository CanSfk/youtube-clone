import React from "react";
import {BarMenu} from "../../assets/icons";
import {truncateText} from "../../utils";

interface MyVideoCardProp {
  imageName: string;
  href?: string;
  title: string;
  accountName: string;
  view: number;
  postedTime: number;
  id: string;
  height: number;
}

export const MyVideoCard: React.FC<MyVideoCardProp> = ({imageName, href = "#", title, accountName, view, postedTime, id, height}) => {
  return (
    <div
      id={id}
      className='flex flex-col gap-3 relative transition-colors duration-300 active:bg-dark-theme-extra-soft-black rounded-md p-1'
    >
      <a
        href='#'
        style={{height: height}}
        className='relative w-full rounded-lg overflow-hidden transition-all duration-500'
      >
        <picture className='absolute inset-0 transition-all duration-500 hover:scale-[1.02]'>
          <source
            type='image/webp'
            srcSet={`${imageName}`}
          />

          <img
            src={`${imageName}`}
            alt='Youtube clone image'
            className='w-full h-full object-cover'
          />
        </picture>

        <div className='absolute bottom-2 right-2 px-1 h-5 bg-[rgba(0,0,0,.6)] rounded-md grid place-items-center'>
          <span className='text-[12px]'>46:32</span>
        </div>
      </a>

      <div className='flex gap-3 group relative'>
        <div className='w-9 h-9 min-w-9 min-h-9 rounded-full overflow-hidden relative'>
          <picture className='absolute inset-0'>
            <source
              type='image/webp'
              srcSet={`${imageName}`}
            />

            <img
              src={`${imageName}`}
              alt='Youtube clone image'
              className='w-full h-full object-cover'
            />
          </picture>
        </div>

        <div className='flex flex-col gap-1'>
          <h3>{truncateText(title, 57)}</h3>

          <div className='flex flex-col text-[14px] text-[#AAAAAA] font-[400]'>
            <a
              href={href}
              className='transition-color duration-300 hover:text-white z-20 w-max'
            >
              {accountName}
            </a>

            <div className='flex items-center gap-1'>
              <span>{view} B görüntüleme</span>
              <span>•</span>
              <span>{postedTime} saat önce</span>
            </div>
          </div>
        </div>

        <div className='min-w-6 min-h-6 w-6 h-6 relative z-20'>
          <button className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border border-transparent transition-all duration-300 hover:bg-dark-theme-soft-black grid place-items-center rounded-full opacity-0 group-hover:opacity-100 active:bg-dark-theme-extra-soft-black active:border-dark-theme-primary-black'>
            <BarMenu />
          </button>
        </div>

        <a
          href='#aaa'
          className='absolute inset-0 z-10'
        />
      </div>
    </div>
  );
};

export default MyVideoCard;
