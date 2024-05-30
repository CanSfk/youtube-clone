import classNames from "classnames";
import {ReactElement} from "react";

interface LargeSidebarItemProp {
  icon: ReactElement<any, any> | JSX.Element;
  title: string;
  iconPosition: string | null;
}

export const LargeSidebarItem: React.FC<LargeSidebarItemProp> = ({icon, title, iconPosition}) => {
  return (
    <button
      className={classNames("flex items-center justify-start w-full px-3 h-10 rounded-xl hover:bg-dark-theme-extra-soft-black", {
        "gap-2": iconPosition === "right",
        "gap-6": iconPosition === "left",
      })}
    >
      {(iconPosition === "left" && (
        <>
          {icon}
          <span className='text-[14px] font-[400]'>{title}</span>
        </>
      )) ||
        (iconPosition === "right" && (
          <>
            <span>{title}</span>
            {icon}
          </>
        ))}
    </button>
  );
};
