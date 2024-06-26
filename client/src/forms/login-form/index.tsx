import { FormEvent } from 'react';
import { MyButton, MyInput } from '../../components';
import { setAuth } from '../../stores/auth/actions';

export const LoginForm = () => {
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const response: Response = await fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    const ms: { user_name: string; full_name: string; profile_image_name: string; status: string; message: string } = await response.json();
    console.log(ms);
    if (ms.status === '200') setAuth(ms.user_name, ms.full_name, ms.profile_image_name, true);
  };

  return (
    <div className='max-w-[600px] mx-auto'>
      <form onSubmit={onSubmit}>
        <div className='flex flex-col gap-5'>
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

          <div className='ml-auto mt-4'>
            <MyButton text='Giriş' type='submit' styleType='outline' color='green' />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
