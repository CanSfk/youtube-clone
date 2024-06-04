import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
  ballonEffect?: boolean;
  styleType?: 'outline' | 'normal';
  color?: 'red' | 'green' | 'yellow' | 'blue';
}

export const MyButton: React.FC<MyButtonProps> = ({ text, className, ballonEffect = false, styleType = 'normal', color = 'green', ...props }) => {
  return (
    <button
      {...props}
      className={classNames(`${className}  p-2 px-5 rounded-md relative group overflow-hidden`, {
        'border': styleType === 'outline',
        'border-green-500 text-green-500': styleType === 'outline' && color === 'green',
        'border-youtube-red text-youtube-red': styleType === 'outline' && color === 'red',
        'border-yellow-500 text-yellow-500': styleType === 'outline' && color === 'yellow',
        'bg-dark-theme-black text-dark-theme-gray': styleType === 'normal',
      })}
    >
      <span className='z-10 relative'>{text}</span>
      {ballonEffect && (
        <span className='absolute top-[65%] left-[85%] w-3 h-3 bg-green-700 rounded-full transition-all duration-500 group-hover:left-0 group-hover:top-0 group-hover:scale-150' />
      )}
      <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 bg-dark-theme-extra-soft-black rounded-full transition-all duration-100 group-active:w-[120%] group-active:h-[120%] opacity-20' />
    </button>
  );
};

export default MyButton;
