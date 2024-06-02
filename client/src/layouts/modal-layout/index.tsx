import {removeModal} from "../../stores/modal/actions";

type ModalLayoutProp = {
  children: React.ReactNode;
};

export const ModalLayout: React.FC<ModalLayoutProp> = ({children}) => {
  return (
    <div className='fixed inset-0 grid place-items-center z-[200]'>
      <div className='z-10 bg-dark-theme-soft-black p-10 rounded-lg relative overflow-hidden'>{children}</div>

      <div
        onClick={removeModal}
        style={{opacity: 0}}
        className='fixed inset-0 bg-[rgba(0,0,0,.6)] modal-opacity-animate'
      />
    </div>
  );
};

export default ModalLayout;
