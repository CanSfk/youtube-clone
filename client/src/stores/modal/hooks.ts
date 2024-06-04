import { useSelector } from 'react-redux';

export const useModal = () => useSelector((state: any) => state.modal);
