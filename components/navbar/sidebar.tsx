"use client"

import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google"
import { cn } from "@/lib/utils";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import FreeCounter from "./free-counter";

interface SidebarProps {
  count : number | null | undefined
}

const montserrat = Montserrat({
    weight: ["600"],
    subsets : ["latin"]
}) 

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    href: "/image",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    href: "/video",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    href: "/music",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    href: "/code",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

const Sidebar:FC<SidebarProps> = ({ count }) => {

  const pathname = usePathname()
  const router = useRouter()

    return (
      <div className="bg-[#111827] text-white h-full flex flex-col p-4 ">
        <div className="flex-1">
          <div className="flex items-center gap-x-2 p-2">
            <Image onClick={() => router.push('/')} src={"/logo.png"} alt="logo" width={35} height={35} />
            <h2 className={cn("font-bold text-2xl", montserrat.className)}>
              Genius
            </h2>
          </div>
          <div className="flex-1 pt-4">
            <div className="flex flex-col space-y-3">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                    pathname === route.href
                      ? "text-white bg-white/10"
                      : "text-zinc-400"
                  )}
                >
                  <div className="flex items-center flex-1">
                    <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                    {route.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <FreeCounter count={count} />
      </div>
    );
}
 
export default Sidebar;