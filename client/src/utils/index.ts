import FileResizer from 'react-image-file-resizer';

export const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

export const optimizeImage = async (image: File, maxWidth: number = 1280, maxHeight: number = 720) => {
  return await new Promise<File>((resolve) => {
    FileResizer.imageFileResizer(
      image,
      maxWidth,
      maxHeight,
      'webp',
      80,
      0,
      (file) => {
        resolve(file as File);
      },
      'file',
      100,
      100,
    );
  });
};

export const calculateTimeEquivalent = (minutes: number): string => {
  if (minutes < 60) return `${minutes} dakika`;
  else if (minutes / 60 > 1 && minutes / 60 < 24) return `${Math.floor(minutes / 60)} saat`;
  else if (minutes / 1440 < 356) return `${Math.floor(minutes / 60)} gün`;
  else return `${Math.floor(minutes / 525600)} yıl`;
};
