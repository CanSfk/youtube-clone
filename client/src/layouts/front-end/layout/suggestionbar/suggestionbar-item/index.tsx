import React from "react";

interface SuggestionbarItemProp {
  title: string;
  href?: string;
}

export const SuggestionbarItem: React.FC<SuggestionbarItemProp> = ({title, href = "#"}) => {
  return (
    <div className='bg-dark-theme-extra-soft-black rounded-lg transition-colors duration-500 hover:bg-dark-theme-primary-black'>
      <a
        className='px-3 h-8 text-[14px] grid place-items-center'
        href={href}
      >
        {title}
      </a>
    </div>
  );
};
