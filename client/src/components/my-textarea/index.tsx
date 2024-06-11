import React, { TextareaHTMLAttributes } from 'react';

interface MyTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const MyTextarea: React.FC<MyTextareaProps> = ({ className, ...props }) => {
  return (
    <textarea
      {...props}
      className={`${className} w-full rounded-md border border-dark-theme-primary-black outline-none bg-transparent text-dark-theme-gray resize-none p-2`}
    ></textarea>
  );
};

export default MyTextarea;
