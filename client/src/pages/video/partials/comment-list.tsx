export const CommentList = () => {
  return (
    <div className='flex gap-4'>
      <div>
        <img
          id='img'
          draggable='false'
          className='rounded-full min-w-10 min-h-10 h-10 w-10'
          alt='Avatar resmi'
          src='https://yt3.ggpht.com/yti/ANjgQV_XxLV3Z6SdxWjxmWKjz2nYaNqv3I8X_QX8q3Uwaj8=s88-c-k-c0x00ffffff-no-rj'
        />
      </div>
      <div className='flex-1 flex-col'>
        <div className='flex gap-2 items-center'>
          <span className='text-[13px]'>@can23</span>
          <span className='text-xs text-dark-theme-gray'>6 day ago</span>
        </div>

        <div>
          <span className='text-sm'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa accusamus modi incidunt, illum quo accusantium dolor asperiores
            consequuntur consectetur. Minima et laborum commodi accusamus obcaecati assumenda enim at ratione facilis!
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommentList;
