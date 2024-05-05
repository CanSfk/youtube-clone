import React, {ReactElement} from "react";

interface SmallSidebarItemProp {
  icon: ReactElement<any, any> | JSX.Element;
  text: string;
}

export const SmallSidebarItem: React.FC<SmallSidebarItemProp> = ({icon, text}) => {
  return (
    <button className='flex flex-col items-center pt-4 pb-[14px] w-16 rounded-[10px] hover:bg-dark-theme-soft-black'>
      {icon}
      <span className='text-[10px] font-[400] leading-5'>{text}</span>
    </button>
  );
};
