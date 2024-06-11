interface MyLogo {
  width: number;
  height: number;
}

export const MyLogo: React.FC<MyLogo> = ({ width, height }) => {
  return (
    <div style={{ width: width, height: height }} className='relative'>
      <img
        src={`${import.meta.env.VITE_BASE_URL}/static/images/logo.png`}
        alt='My logo'
        className='absolute top-0 left-0 w-full h-full object-contain'
      />
    </div>
  );
};

export default MyLogo;
