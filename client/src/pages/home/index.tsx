import {useEffect, useState} from "react";
import {MyVideoCard} from "../../components";

export const Home = () => {
  const videos = [
    {
      imageName: "1.webp",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem optio dolores voluptate natus minus maiores quo voluptas at harum ratione.",
      accountName: "hesap 1",
      view: 2.8,
      postedTime: 12,
    },
    {
      imageName: "2.webp",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem optio dolores voluptate natus minus maiores quo voluptas at harum ratione.",
      accountName: "hesap 2",
      view: 2.8,
      postedTime: 12,
    },
    {
      imageName: "3.webp",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem optio dolores voluptate natus minus maiores quo voluptas at harum ratione.",
      accountName: "hesap 3",
      view: 2.8,
      postedTime: 12,
    },
    {
      imageName: "4.webp",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem optio dolores voluptate natus minus maiores quo voluptas at harum ratione.",
      accountName: "hesap 4",
      view: 2.8,
      postedTime: 12,
    },
    {
      imageName: "5.webp",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem optio dolores voluptate natus minus maiores quo voluptas at harum ratione.",
      accountName: "hesap 5",
      view: 2.8,
      postedTime: 12,
    },
    {
      imageName: "6.webp",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem optio dolores voluptate natus minus maiores quo voluptas at harum ratione.",
      accountName: "hesap 6",
      view: 2.8,
      postedTime: 12,
    },
    {
      imageName: "7.webp",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem optio dolores voluptate natus minus maiores quo voluptas at harum ratione.",
      accountName: "hesap 7",
      view: 2.8,
      postedTime: 12,
    },
    {
      imageName: "8.webp",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem optio dolores voluptate natus minus maiores quo voluptas at harum ratione.",
      accountName: "hesap 8",
      view: 2.8,
      postedTime: 12,
    },
    {
      imageName: "1.webp",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem optio dolores voluptate natus minus maiores quo voluptas at harum ratione.",
      accountName: "hesap 1",
      view: 2.8,
      postedTime: 12,
    },
    {
      imageName: "2.webp",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem optio dolores voluptate natus minus maiores quo voluptas at harum ratione.",
      accountName: "hesap 2",
      view: 2.8,
      postedTime: 12,
    },
    {
      imageName: "3.webp",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem optio dolores voluptate natus minus maiores quo voluptas at harum ratione.",
      accountName: "hesap 3",
      view: 2.8,
      postedTime: 12,
    },
    {
      imageName: "4.webp",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem optio dolores voluptate natus minus maiores quo voluptas at harum ratione.",
      accountName: "hesap 4",
      view: 2.8,
      postedTime: 12,
    },
    {
      imageName: "5.webp",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem optio dolores voluptate natus minus maiores quo voluptas at harum ratione.",
      accountName: "hesap 5",
      view: 2.8,
      postedTime: 12,
    },
    {
      imageName: "6.webp",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem optio dolores voluptate natus minus maiores quo voluptas at harum ratione.",
      accountName: "hesap 6",
      view: 2.8,
      postedTime: 12,
    },
    {
      imageName: "7.webp",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem optio dolores voluptate natus minus maiores quo voluptas at harum ratione.",
      accountName: "hesap 7",
      view: 2.8,
      postedTime: 12,
    },
    {
      imageName: "8.webp",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem optio dolores voluptate natus minus maiores quo voluptas at harum ratione.",
      accountName: "hesap 8",
      view: 2.8,
      postedTime: 12,
    },
  ];

  const [height, setHeight] = useState<number>(200);
  const [videoCard, setVideoCard] = useState<HTMLElement | undefined>();

  const handleResize = () => {
    videoCard ? setHeight(Math.floor(videoCard.clientWidth * 56.2) / 100) : 200;
  };

  useEffect(() => {
    setVideoCard(document.getElementById("card-1") || undefined);
  }, []);

  useEffect(() => {
    if (videoCard) {
      handleResize();

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [videoCard]);

  return (
    <article className='w-full flex-1'>
      <section className='vide-card-list-grid gap-x-3 gap-y-8'>
        {(videos || []).map((vd, index) => (
          <MyVideoCard
            id={`card-${index}`}
            key={index}
            imageName={vd.imageName}
            title={vd.title}
            view={vd.view}
            postedTime={vd.postedTime}
            accountName={vd.accountName}
            height={height}
          />
        ))}
      </section>
    </article>
  );
};

export default Home;
