"use client"

import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";


export const MobileSidebar = () => {
    const [isMounted, setItMounted] = useState(false);

    useEffect(() => {
        setItMounted(true);
    }, [])

    if (!isMounted) {
        return null;
    }
    
  return (
    <Sheet>
        <SheetTrigger>
            <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
            <Sidebar />
        </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar;