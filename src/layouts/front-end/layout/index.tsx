import {ReactNode} from "react";
import Navbar from "./navbar";
import {Sidebar} from "./sidebar";

interface LayoutProps {
  children: ReactNode;
}

export const FrontEndLayout = ({children}: LayoutProps) => {
  return (
    <div className='w-full min-h-[2000px] bg-dark-theme-black text-dark-theme-white flex flex-col'>
      <Navbar />
      <div className='flex gap-4'>
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default FrontEndLayout;
