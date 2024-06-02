import classNames from "classnames";
import {
  BeforeTimeIcon,
  ChannelIcon,
  FlagIcon,
  GameIcon,
  HelpIcon,
  HomeIcon,
  InfoIcon,
  LikeIcon,
  LiveIcon,
  MenuIcon,
  MusicIcon,
  PlayerListIcon,
  RightArrowIcon,
  SettingIcon,
  ShortIcon,
  SportIcon,
  Subscriber,
  TimeIcon,
  TrendIcon,
  VideoIcon,
  YoutubeIcon,
  YoutubeKidsIcon,
  YoutubeMusicIcon,
  YoutubePremiumIcon,
  YoutubeStudioIcon,
} from "../../../../../assets/icons";
import {useMenu} from "../../../../../stores/menu/hooks";
import {truncateText} from "../../../../../utils";
import LargeSidebarFooter from "./large-sidebar-footer";
import {LargeSidebarItem} from "./large-sidebar-item";
import {removeMenu} from "../../../../../stores/menu/actions";
import {setModal} from "../../../../../stores/modal/actions";

type largeSidebarItemProps = {
  parentTitle: string | null;
  child: largetSidebarItemChildProp[];
};

type largetSidebarItemChildProp = {
  childTitle: string;
  childLeftIcon: React.ReactNode;
  childRightIcon: React.ReactNode;
  childOnClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const largeSidebarItems: largeSidebarItemProps[] = [
  {
    parentTitle: null,
    child: [
      {
        childTitle: "Ana Sayfa",
        childLeftIcon: <HomeIcon />,
        childRightIcon: null,
        childOnClick: () => removeMenu(),
      },
      {
        childTitle: "Shorts",
        childLeftIcon: <ShortIcon />,
        childRightIcon: null,
        childOnClick: () => removeMenu(),
      },
      {
        childTitle: "Abonelikler",
        childLeftIcon: <Subscriber />,
        childRightIcon: null,
        childOnClick: () => removeMenu(),
      },
    ],
  },
  {
    parentTitle: null,
    child: [
      {
        childTitle: "Siz",
        childLeftIcon: null,
        childRightIcon: (
          <RightArrowIcon
            width={16}
            height={16}
            viewBox='0 0 16 16'
          />
        ),
        childOnClick: () => removeMenu(),
      },
      {
        childTitle: "Kanalınız",
        childLeftIcon: <ChannelIcon />,
        childRightIcon: null,
        childOnClick: () => removeMenu(),
      },
      {
        childTitle: "Geçmiş",
        childLeftIcon: <BeforeTimeIcon />,
        childRightIcon: null,
        childOnClick: () => removeMenu(),
      },
      {
        childTitle: "Oynatma listesi",
        childLeftIcon: <PlayerListIcon />,
        childRightIcon: null,
        childOnClick: () => removeMenu(),
      },
      {
        childTitle: "Videolarınız",
        childLeftIcon: <VideoIcon />,
        childRightIcon: null,
        childOnClick: () => removeMenu(),
      },
      {
        childTitle: "Daha sonra izle",
        childLeftIcon: <TimeIcon />,
        childRightIcon: null,
        childOnClick: () => removeMenu(),
      },
      {
        childTitle: "Beğendiğin videolar",
        childLeftIcon: <LikeIcon />,
        childRightIcon: null,
        childOnClick: () => removeMenu(),
      },
    ],
  },
  {
    parentTitle: "Abonelikler",
    child: [
      {
        childTitle: "Abonelik-1",
        childLeftIcon: <ShortIcon />,
        childRightIcon: null,
        childOnClick: () => removeMenu(),
      },
      {
        childTitle: "Abonelik-2",
        childLeftIcon: <ShortIcon />,
        childRightIcon: null,
        childOnClick: () => removeMenu(),
      },
      {
        childTitle: "Abonelik-3",
        childLeftIcon: <ShortIcon />,
        childRightIcon: null,
        childOnClick: () => removeMenu(),
      },
    ],
  },
  {
    parentTitle: "Keşfet",
    child: [
      {
        childTitle: "Trendler",
        childLeftIcon: <TrendIcon />,
        childRightIcon: null,
        childOnClick: () => removeMenu(),
      },
      {
        childTitle: "Müzik",
        childLeftIcon: <MusicIcon />,
        childRightIcon: null,
        childOnClick: () => removeMenu(),
      },
      {
        childTitle: "Canlı",
        childLeftIcon: <LiveIcon />,
        childRightIcon: null,
        childOnClick: () => removeMenu(),
      },
      {
        childTitle: "Oyun",
        childLeftIcon: <GameIcon />,
        childRightIcon: null,
        childOnClick: () => removeMenu(),
      },
      {
        childTitle: "Spor",
        childLeftIcon: <SportIcon />,
        childRightIcon: null,
        childOnClick: () => removeMenu(),
      },
    ],
  },
  {
    parentTitle: "YouTube'dan daha fazla içerik",
    child: [
      {
        childTitle: "YouTube Premium",
        childLeftIcon: <YoutubePremiumIcon />,
        childRightIcon: null,
        childOnClick: () => removeMenu(),
      },
      {
        childTitle: "YouTube Studio",
        childLeftIcon: <YoutubeStudioIcon />,
        childRightIcon: null,
        childOnClick: () => {
          setModal("youtube_studio_modal", {});
          removeMenu();
        },
      },
      {
        childTitle: "YouTube Music",
        childLeftIcon: <YoutubeMusicIcon />,
        childRightIcon: null,
        childOnClick: () => removeMenu(),
      },
      {
        childTitle: "YouTube Kids",
        childLeftIcon: <YoutubeKidsIcon />,
        childRightIcon: null,
        childOnClick: () => removeMenu(),
      },
    ],
  },
  {
    parentTitle: null,
    child: [
      {
        childTitle: "Ayarlar",
        childLeftIcon: <SettingIcon />,
        childRightIcon: null,
        childOnClick: () => removeMenu(),
      },
      {
        childTitle: "İçerik bildirme geçmişi",
        childLeftIcon: <FlagIcon />,
        childRightIcon: null,
        childOnClick: () => removeMenu(),
      },
      {
        childTitle: "Yardım",
        childLeftIcon: <HelpIcon />,
        childRightIcon: null,
        childOnClick: () => removeMenu(),
      },
      {
        childTitle: "Geri bildirim gönder",
        childLeftIcon: <InfoIcon />,
        childRightIcon: null,
        childOnClick: () => removeMenu(),
      },
    ],
  },
];

export const LargeSidebar = () => {
  const {menuName} = useMenu();

  return (
    <div
      className={classNames("fixed top-0 max-h-screen h-screen bg-dark-theme-black -left-[240px] w-[240px] transition-all duration-200 z-[300]", {
        "!left-0": menuName === "sidebar-menu",
      })}
    >
      <div className='flex items-center pl-4'>
        <button
          type='button'
          onClick={() => removeMenu()}
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

      <div className='h-[calc(100%-56px)] overflow-y-auto custom-scrollbar'>
        <div className='flex items-center flex-col '>
          {(largeSidebarItems || []).map((parentItem, index) => (
            <div
              key={index}
              className='py-3 w-full border-b-[.5px] border-dark-theme-primary-black'
            >
              {parentItem.parentTitle !== null && <h3 className='pl-6 pt-[6px] pb-1'>{truncateText(parentItem.parentTitle, 22)}</h3>}
              <div className='flex items-center flex-col w-full px-3'>
                {(parentItem.child || []).map((childItem, index) => (
                  <LargeSidebarItem
                    key={index}
                    icon={(childItem.childLeftIcon && childItem.childLeftIcon) || (childItem.childRightIcon && childItem.childRightIcon)}
                    title={truncateText(childItem.childTitle, 19)}
                    iconPosition={(childItem.childLeftIcon && "left") || (childItem.childRightIcon && "right") || null}
                    onClick={childItem.childOnClick}
                  />
                ))}
              </div>
            </div>
          ))}

          <LargeSidebarFooter />
        </div>
      </div>
    </div>
  );
};

export default LargeSidebar;
