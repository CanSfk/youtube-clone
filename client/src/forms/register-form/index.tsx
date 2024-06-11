import { FormEvent, useEffect, useState } from 'react';
import { MyButton, MyInput } from '../../components';
import { setAuth } from '../../stores/auth/actions';
import { FilePond } from 'react-filepond';
import { optimizeImage } from '../../utils';

type filesType = {
  profileImageFile: File[];
  optimizedImageFile: File;
};

export const RegisterForm = () => {
  const [files, setFiles] = useState<filesType>({ profileImageFile: [], optimizedImageFile: {} as File });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    formData.append('profile_image_file', files.optimizedImageFile);

    const response: Response = await fetch(`${import.meta.env.VITE_BASE_URL}/register`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    const ms: { user_name: string; full_name: string; profile_image_name: string; status: string; message: string } = await response.json();

    if (ms.status === '200') setAuth(ms.user_name, ms.full_name, ms.profile_image_name, true);
  };

  useEffect(() => {
    let time: number;

    if (files.profileImageFile.length > 0) {
      time = setTimeout(async () => {
        const optimizedImage = await optimizeImage(files.profileImageFile[0]);

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
  }, [files.profileImageFile]);

  return (
    <>
      <style>{`.filepond--panel-root {background-color: #212121;}`}</style>

      <div className='max-w-[600px] mx-auto'>
        <form onSubmit={onSubmit} encType='multipart/form-data'>
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-2 flex-1'>
              <label htmlFor='full_name' className='text-dark-theme-white'>
                Ad Soyad
              </label>

              <MyInput id='full_name' name='full_name' />
            </div>

            <div className='flex flex-col gap-2 flex-1'>
              <label htmlFor='user_name' className='text-dark-theme-white'>
                Kullanıcı Adı
              </label>

              <MyInput id='user_name' name='user_name' />
            </div>

            <div className='flex flex-col gap-2 flex-1'>
              <label htmlFor='password' className='text-dark-theme-white'>
                Şifre
              </label>

              <MyInput id='password' name='password' type='password' />
            </div>

            <div className='flex flex-col gap-2 flex-1'>
              <label htmlFor='profile_image' className='text-dark-theme-white'>
                Profil resmi
              </label>

              <FilePond
                files={files.profileImageFile}
                onupdatefiles={(fileItems) =>
                  setFiles((prevData) => {
                    const data = { ...prevData };
                    data.profileImageFile = fileItems.map((fileItem) => fileItem.file) as File[];
                    return data;
                  })
                }
                id='profile_image'
                name='profile_image_file'
                acceptedFileTypes={['image/jpeg', 'image/jpg', 'image/webp', 'image/png']}
                labelIdle='Dosyanızı sürükleyip bırakın veya gözatın <span class="filepond--label-action">Dosyalar</span>'
                maxFiles={1}
              />
            </div>

            <div className='ml-auto mt-4'>
              <MyButton text='Kaydol' type='submit' styleType='outline' color='green' />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
