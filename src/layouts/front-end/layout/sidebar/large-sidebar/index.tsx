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
import {truncateText} from "../../../../../utils";
import LargeSidebarFooter from "./large-sidebar-footer";
import {LargeSidebarItem} from "./large-sidebar-item";

const largeSidebarItems = [
  {
    parentTitle: null,
    child: [
      {
        childTitle: "Ana Sayfa",
        childLeftIcon: <HomeIcon />,
        childRightIcon: null,
      },
      {
        childTitle: "Shorts",
        childLeftIcon: <ShortIcon />,
        childRightIcon: null,
      },
      {
        childTitle: "Abonelikler",
        childLeftIcon: <Subscriber />,
        childRightIcon: null,
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
      },
      {
        childTitle: "Kanalınız",
        childLeftIcon: <ChannelIcon />,
        childRightIcon: null,
      },
      {
        childTitle: "Geçmiş",
        childLeftIcon: <BeforeTimeIcon />,
        childRightIcon: null,
      },
      {
        childTitle: "Oynatma listesi",
        childLeftIcon: <PlayerListIcon />,
        childRightIcon: null,
      },
      {
        childTitle: "Videolarınız",
        childLeftIcon: <VideoIcon />,
        childRightIcon: null,
      },
      {
        childTitle: "Daha sonra izle",
        childLeftIcon: <TimeIcon />,
        childRightIcon: null,
      },
      {
        childTitle: "Beğendiğin videolar",
        childLeftIcon: <LikeIcon />,
        childRightIcon: null,
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
      },
      {
        childTitle: "Abonelik-2",
        childLeftIcon: <ShortIcon />,
        childRightIcon: null,
      },
      {
        childTitle: "Abonelik-3",
        childLeftIcon: <ShortIcon />,
        childRightIcon: null,
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
      },
      {
        childTitle: "Müzik",
        childLeftIcon: <MusicIcon />,
        childRightIcon: null,
      },
      {
        childTitle: "Canlı",
        childLeftIcon: <LiveIcon />,
        childRightIcon: null,
      },
      {
        childTitle: "Oyun",
        childLeftIcon: <GameIcon />,
        childRightIcon: null,
      },
      {
        childTitle: "Spor",
        childLeftIcon: <SportIcon />,
        childRightIcon: null,
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
      },
      {
        childTitle: "YouTube Studio",
        childLeftIcon: <YoutubeStudioIcon />,
        childRightIcon: null,
      },
      {
        childTitle: "YouTube Music",
        childLeftIcon: <YoutubeMusicIcon />,
        childRightIcon: null,
      },
      {
        childTitle: "YouTube Kids",
        childLeftIcon: <YoutubeKidsIcon />,
        childRightIcon: null,
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
      },
      {
        childTitle: "İçerik bildirme geçmişi",
        childLeftIcon: <FlagIcon />,
        childRightIcon: null,
      },
      {
        childTitle: "Yardım",
        childLeftIcon: <HelpIcon />,
        childRightIcon: null,
      },
      {
        childTitle: "Geri bildirim gönder",
        childLeftIcon: <InfoIcon />,
        childRightIcon: null,
      },
    ],
  },
];

export const LargeSidebar = () => {
  return (
    <div className='fixed top-0 left-0 max-h-screen h-screen bg-dark-theme-black  w-[240px]'>
      <div className='flex items-center pl-4'>
        <button
          type='button'
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
          {(largeSidebarItems || []).map((parentItem) => (
            <div className='py-3 w-full border-b-[.5px] border-dark-theme-primary-black'>
              {parentItem.parentTitle !== null && <h3 className='pl-6 pt-[6px] pb-1'>{truncateText(parentItem.parentTitle, 22)}</h3>}
              <div className='flex items-center flex-col w-full px-3'>
                {(parentItem.child || []).map((childItem) => (
                  <LargeSidebarItem
                    icon={(childItem.childLeftIcon && childItem.childLeftIcon) || (childItem.childRightIcon && childItem.childRightIcon)}
                    title={truncateText(childItem.childTitle, 19)}
                    iconPosition={(childItem.childLeftIcon && "left") || (childItem.childRightIcon && "right") || null}
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
