import { useState } from 'react';
import { MyBallonButton } from '../../components';
import LoginForm from '../login-form';
import RegisterForm from '../register-form';

interface Form {
  formName: 'login' | 'register';
}

export const AuthForm = () => {
  const [form, setForm] = useState<Form>({ formName: 'login' });

  return (
    <div className='mx-auto w-max flex flex-col gap-10'>
      <div className='flex items-center gap-3 mx-auto'>
        <MyBallonButton onClick={() => setForm({ formName: 'login' })} title='Giriş' active={form?.formName === 'login'} />
        <MyBallonButton onClick={() => setForm({ formName: 'register' })} title='Kaydol' active={form?.formName === 'register'} />
      </div>

      <div className='w-[600px]'>{(form.formName === 'login' && <LoginForm />) || (form.formName === 'register' && <RegisterForm />)}</div>
    </div>
  );
};

export default AuthForm;
