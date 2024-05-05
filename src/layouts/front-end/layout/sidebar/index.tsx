import {ReactElement} from "react";
import {HomeIcon, ShortIcon, Subscriber, YouIcon} from "../../../../assets/icons";
import {SmallSidebarItem} from "./small-sidebar-item";
import {LargeSidebarItem} from "./large-sidebar-item";

interface smallMenuItemType {
  title: string;
  icon: ReactElement<any, any> | JSX.Element;
}

export const Sidebar = () => {
  const smalMenuItems: smallMenuItemType[] = [
    {
      title: "Ana Sayfa",
      icon: <HomeIcon />,
    },
    {
      title: "Shorts",
      icon: <ShortIcon />,
    },
    {
      title: "Abonelikler",
      icon: <Subscriber />,
    },
    {
      title: "Siz",
      icon: <YouIcon />,
    },
  ];

  return (
    <div>
      <div className='w-[72px]' />

      <div className='fixed top-14 left-0 bottom-0'>
        <div className='flex flex-col px-1'>
          {(smalMenuItems || []).map((sm) => (
            <SmallSidebarItem
              icon={sm.icon}
              text={sm.title}
            />
          ))}
        </div>
      </div>

      {/* <LargeSidebarItem /> */}
    </div>
  );
};
