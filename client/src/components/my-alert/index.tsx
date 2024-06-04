import classNames from 'classnames';

type MyAlertProps = {
  message: string;
  variant?: 'error' | 'success';
};

export const MyAlert: React.FC<MyAlertProps> = ({ message, variant = 'success' }) => {
  return (
    <div className='opacity-0 absolute top-1.5 -right-24 my-alert-animate'>
      <div
        className={classNames('py-1 px-3 rounded-md', {
          'bg-green-500': variant === 'success',
          'bg-red-500': variant === 'error',
        })}
      >
        {message}
      </div>
    </div>
  );
};

export default MyAlert;
