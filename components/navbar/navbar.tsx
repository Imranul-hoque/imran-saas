"use client"
import { UserButton } from '@clerk/nextjs';
import MobileSidebar from './mobile-sidebar';
import { FC } from 'react';

interface NavbarProps {
  count: number | null | undefined;
}

const Navbar:FC<NavbarProps> = ({ count }) => {
    return ( 
        <div className="h-[70px] shadow-sm pb-5 flex items-center justify-between px-5">
            <MobileSidebar count={count} />
            <UserButton />
        </div>
     );
}
 
export default Navbar;