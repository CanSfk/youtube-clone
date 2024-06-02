import modalRoutes from "../routes/modal-routes";
import {useModal} from "../stores/modal/hooks";

export const Modal = () => {
  const {modalName} = useModal();
  const currentModal = (modalRoutes || []).find((md) => md.name === modalName);

  return <>{currentModal && <currentModal.element />}</>;
};

export default Modal;
