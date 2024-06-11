import React, { InputHTMLAttributes } from 'react';

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const MyInput: React.FC<MyInputProps> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={`${className} w-full rounded-md border border-dark-theme-primary-black outline-none bg-transparent text-dark-theme-gray resize-none p-2`}
    />
  );
};

export default MyInput;
