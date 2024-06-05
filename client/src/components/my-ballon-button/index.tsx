import classNames from 'classnames';
import { ButtonHTMLAttributes, useEffect, useState } from 'react';

interface Balloon {
  size: number;
  position: {
    top: number;
    left: number;
  };
}

interface BallonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  active?: boolean;
}

export const MyBallonButton: React.FC<BallonProps> = ({ title, active, ...props }) => {
  const [ballons, setBallons] = useState<Balloon[]>();

  useEffect(() => {
    (() => {
      const newBallons: Balloon[] = [];

      for (let index = 0; index < 5; index++) {
        const ballon: Balloon = {
          size: Math.floor(Math.random() * 11 + 4),
          position: {
            top: Math.floor(Math.random() * 70 + 4),
            left: Math.floor(Math.random() * 70 + 4),
          },
        };
        newBallons.push(ballon);
      }
      setBallons(newBallons);
    })();
  }, []);
  return (
    <div
      className={classNames('border border-dark-theme-primary-black rounded-xl transition-all duration-300', {
        'shadow-[0_0_3px_rgba(34,197,94,0.5)] border-green-700': active,
      })}
    >
      <div className='relative group overflow-hidden rounded-xl '>
        <button {...props} className='py-2 px-10'>
          <span
            className={classNames('text-dark-theme-primary-black z-10 relative', {
              'text-green-700': active,
            })}
          >
            {title}
          </span>

          {(ballons || []).map((bl, index) => (
            <span
              key={index}
              style={
                {
                  '--random': Math.random() * 30 - 15 + 'px',
                  'left': `${bl.position.left}%`,
                  'top': `${bl.position.top}%`,
                  'width': bl.size,
                  'height': bl.size,
                } as React.CSSProperties
              }
              className={classNames('absolute opacity-20  rounded-full bg-green-500', {
                'my-button-balloon-animate': active,
              })}
            />
          ))}
        </button>
      </div>
    </div>
  );
};

export default MyBallonButton;
