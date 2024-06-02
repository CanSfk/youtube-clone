import {FilePond, registerPlugin} from "react-filepond";
import ModalLayout from "../../layouts/modal-layout";
import "filepond/dist/filepond.min.css";
import "../../assets/css/filepond.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

import {FormEvent, useState} from "react";
import {removeModal} from "../../stores/modal/actions";
import {MyAlert, MyButton, MyInput, MyTextarea} from "../../components";

registerPlugin(FilePondPluginFileValidateType);

type responseMessageType = {
  message: string;
  status: string;
};

export const YoutubeStudioModal = () => {
  const [responseMessage, setReponseMessage] = useState<responseMessageType>();
  const [file, setFile] = useState<unknown>();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    if (file) {
      formData.append("video_file", file as Blob);
    }

    const response: Response = await fetch("http://localhost:8085/video/create", {
      method: "POST",
      body: formData,
    });

    const ms: {message: string; status: string} = await response.json();

    setReponseMessage({message: ms.message, status: ms.status});
  };

  return (
    <ModalLayout>
      <div className='min-w-[800px]'>
        <form
          onSubmit={onSubmit}
          encType='multipart/form-data'
        >
          <div className='flex gap-4'>
            <div className='flex flex-col gap-2 flex-1'>
              <label
                htmlFor='video'
                className='text-dark-theme-white'
              >
                Video dosyası
              </label>

              <FilePond
                id='video'
                name='video_file'
                acceptedFileTypes={["video/mp4", "video/quicktime"]}
                labelFileTypeNotAllowed='Geçersiz dosya türü'
                fileValidateTypeLabelExpectedTypes='jpg, jpeg, png, webp türünde dosya bekleniyor'
                labelIdle='Dosyanızı sürükleyip bırakın veya gözatın <span class="filepond--label-action">Dosyalar</span>'
                onupdatefiles={(fileItems) => {
                  setFile(fileItems[0].file);
                }}
              />
            </div>

            <div className='flex flex-col gap-2 flex-1'>
              <label
                htmlFor='video'
                className='text-dark-theme-white'
              >
                Kapak resmi
              </label>

              <FilePond
                id='video'
                name='cover_image_file'
                acceptedFileTypes={["image/jpeg", "image/jpg", "image/webp", "image/png"]}
                labelIdle='Dosyanızı sürükleyip bırakın veya gözatın <span class="filepond--label-action">Dosyalar</span>'
              />
            </div>
          </div>

          <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2 flex-1'>
                <label
                  htmlFor='video_title'
                  className='text-dark-theme-white'
                >
                  Başlık
                </label>

                <MyInput
                  id='video_title'
                  name='video_title'
                />
              </div>

              <div className='flex flex-col gap-2 flex-1'>
                <label
                  htmlFor='video_description'
                  className='text-dark-theme-white'
                >
                  Açıklama
                </label>

                <MyTextarea
                  id='video_description'
                  name='video_description'
                  rows={6}
                />
              </div>
            </div>

            <div className='flex gap-5 flex-1 ml-auto'>
              <MyButton
                text='İptal'
                type='button'
                styleType='outline'
                onClick={removeModal}
              />
              <MyButton
                ballonEffect
                text='Kaydet'
                type='submit'
              />
            </div>
          </div>
        </form>
      </div>

      {responseMessage && (
        <MyAlert
          message={responseMessage.message}
          variant={responseMessage.status === "200" ? "success" : "error"}
        />
      )}
    </ModalLayout>
  );
};

export default YoutubeStudioModal;
