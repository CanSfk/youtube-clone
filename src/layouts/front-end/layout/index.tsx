import {ReactNode} from "react";
import Navbar from "./navbar";

interface LayoutProps {
  children: ReactNode;
}

export const FrontEndLayout = ({children}: LayoutProps) => {
  return (
    <div className='w-full min-h-screen bg-dark-theme-black text-dark-theme-white'>
      <Navbar />
      {children}
    </div>
  );
};

export default FrontEndLayout;
