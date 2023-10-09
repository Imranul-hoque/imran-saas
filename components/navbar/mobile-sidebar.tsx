"use client"
import { useState, useEffect, FC } from 'react';
import { Menu } from 'lucide-react'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import Sidebar from './sidebar';


interface MobileSidebarProps {
  count: number | null | undefined;
}


const MobileSidebar:FC<MobileSidebarProps> = ({ count }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, []);

    if (!isMounted) {
        return null;
    }

    

    return ( 
        <Sheet>
            <SheetTrigger>
                <Menu className='md:hidden cursor-pointer' />
            </SheetTrigger>
            <SheetContent side={"left"} className='bg-[#111827] text-white'>
                <Sidebar count={count} />
            </SheetContent>
        </Sheet>
     );
}
 
export default MobileSidebar;