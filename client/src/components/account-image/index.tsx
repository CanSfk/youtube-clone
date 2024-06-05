interface AccountImageProps {
  width?: number;
  height?: number;
  size?: 'sm' | 'md' | 'lg';
  imageName: string;
}

export const AccountImage: React.FC<AccountImageProps> = ({ width = 40, height = 40, size = 'sm', imageName }) => {
  return (
    <div style={{ width: width, height: height }} className='relative rounded-full overflow-hidden'>
      <source type='image/webp' srcSet={`${import.meta.env.VITE_BASE_URL}/static/uploads/images/${size}-${imageName}`} />

      <img
        src={`${import.meta.env.VITE_BASE_URL}/static/uploads/images/${size}-${imageName}`}
        alt='Youtube clone image'
        className='w-full h-full object-cover'
      />
    </div>
  );
};

export default AccountImage;
