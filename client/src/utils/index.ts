import FileResizer from "react-image-file-resizer";

export const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export const optimizeImage = async (image: File, maxWidth: number = 1280, maxHeight: number = 720) => {
  return await new Promise<File>((resolve) => {
    FileResizer.imageFileResizer(
      image,
      maxWidth,
      maxHeight,
      "webp",
      80,
      0,
      (file) => {
        resolve(file as File);
      },
      "file",
      100,
      100
    );
  });
};
