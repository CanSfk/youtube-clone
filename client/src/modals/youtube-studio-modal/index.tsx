import { FormEvent, useEffect, useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import ModalLayout from '../../layouts/modal-layout';
import 'filepond/dist/filepond.min.css';
import '../../assets/css/filepond.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

import { removeModal } from '../../stores/modal/actions';
import { MyAlert, MyButton, MyInput, MyTextarea } from '../../components';
import { optimizeImage } from '../../utils';
import { setVideo } from '../../stores/video/actions';

registerPlugin(FilePondPluginFileValidateType);

type responseMessageType = {
  message: string;
  status: string;
};

type filesType = {
  videoFile: File[];
  imageFile: File[];
  optimizedImageFile: File;
};

export const YoutubeStudioModal = () => {
  const [responseMessage, setReponseMessage] = useState<responseMessageType | null>(null);
  const [files, setFiles] = useState<filesType>({ videoFile: [], imageFile: [], optimizedImageFile: {} as File });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    if (files.videoFile && files.videoFile.length > 0) formData.append('video_file', files.videoFile[0] as Blob);
    if (files.optimizedImageFile) formData.append('image_file', files.optimizedImageFile);

    const response: Response = await fetch(`${import.meta.env.VITE_BASE_URL}/video/create`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (response.ok) {
      const { message, video } = await response.json();

      setVideo(video);
      setReponseMessage({ message: message.message, status: message.status });
    } else {
      const ms: { message: { message: string; status: string } } = await response.json();

      setReponseMessage({ message: ms.message.message, status: ms.message.status });
    }
  };

  useEffect(() => {
    let time: number;

    if (files.imageFile.length > 0) {
      time = setTimeout(async () => {
        const optimizedImage = await optimizeImage(files.imageFile[0]);

        setFiles((prevData) => {
          const data = { ...prevData };
          data.optimizedImageFile = optimizedImage;
          return data;
        });
      }, 1000);
    }

    return () => {
      clearTimeout(time);
    };
  }, [files.imageFile]);

  return (
    <ModalLayout>
      <div className='w-[800px] max-lg:w-full'>
        <form onSubmit={onSubmit} encType='multipart/form-data'>
          <div className='flex gap-4 max-md:flex-col'>
            <div className='flex flex-col gap-2 flex-1'>
              <label htmlFor='video' className='text-dark-theme-white'>
                Video dosyası
              </label>

              <FilePond
                files={files.videoFile}
                onupdatefiles={(fileItems) =>
                  setFiles((prevData) => {
                    const data = { ...prevData };
                    data.videoFile = fileItems.map((fileItem) => fileItem.file) as File[];
                    return data;
                  })
                }
                id='video'
                name='video_file'
                labelFileTypeNotAllowed='Geçersiz dosya türü'
                acceptedFileTypes={['video/mp4', 'video/quicktime']}
                fileValidateTypeLabelExpectedTypes='quicktime, mp4 türünde dosya bekleniyor'
                labelIdle='Dosyanızı sürükleyip bırakın veya gözatın <span class="filepond--label-action">Dosyalar</span>'
              />
            </div>

            <div className='flex flex-col gap-2 flex-1'>
              <label htmlFor='cover_image' className='text-dark-theme-white'>
                Kapak resmi
              </label>

              <FilePond
                files={files.imageFile}
                onupdatefiles={(fileItems) =>
                  setFiles((prevData) => {
                    const data = { ...prevData };
                    data.imageFile = fileItems.map((fileItem) => fileItem.file) as File[];
                    return data;
                  })
                }
                id='cover_image'
                name='cover_image_file'
                acceptedFileTypes={['image/jpeg', 'image/jpg', 'image/webp', 'image/png']}
                labelIdle='Dosyanızı sürükleyip bırakın veya gözatın <span class="filepond--label-action">Dosyalar</span>'
                maxFiles={1}
              />
            </div>
          </div>

          <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2 flex-1'>
                <label htmlFor='video_title' className='text-dark-theme-white'>
                  Başlık
                </label>

                <MyInput id='video_title' name='video_title' />
              </div>

              <div className='flex flex-col gap-2 flex-1'>
                <label htmlFor='video_description' className='text-dark-theme-white'>
                  Açıklama
                </label>

                <MyTextarea id='video_description' name='video_description' rows={6} />
              </div>
            </div>

            <div className='flex gap-5 flex-1 ml-auto'>
              <MyButton text='İptal' type='button' styleType='outline' onClick={removeModal} />
              <MyButton ballonEffect text='Kaydet' type='submit' />
            </div>
          </div>
        </form>
      </div>

      {responseMessage && <MyAlert message={responseMessage.message} variant={responseMessage.status === '200' ? 'success' : 'error'} />}
    </ModalLayout>
  );
};

export default YoutubeStudioModal;
