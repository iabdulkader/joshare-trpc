"use client"

import Link from "next/link";
import ThemeToggle from "../Theme/ThemeToggle";
import { usePathname } from "next/navigation";

export default function Footer() {
    const path = usePathname();

    return(
        <div className="fixed bottom-0 left-0 w-full h-20 bg-bg-light dark:bg-bg-dark font-light text-current dark:text-slate-200 flex">
            <div className="my-auto flex justify-evenly w-full text-xs lg:text-base items-center relative">

                <div className={`relative group ${path === "/about" ? 'active': ''}`} >
                    <Link href="/about">
                        About
                    </Link>
                    <div className="absolute invisible group-[.active]:visible top-full h-1 w-1 bg-bg-dark dark:bg-bg-light left-[50%] translate-x-[-50%] rounded-[50%] mt-1" />
                </div> 

                <div className={`relative group ${path === "/terms" ? 'active': ''}`} >
                    <Link href="/terms">
                        Terms
                    </Link>
                    <div className="absolute invisible group-[.active]:visible top-full h-1 w-1 bg-bg-dark dark:bg-bg-light left-[50%] translate-x-[-50%] rounded-[50%] mt-1" />
                </div> 

                <div className={`relative group ${path === "/guide" ? 'active': ''}`} >
                    <Link href="/guide">
                        Guide
                    </Link>
                    <div className="absolute invisible group-[.active]:visible top-full h-1 w-1 bg-bg-dark dark:bg-bg-light left-[50%] translate-x-[-50%] rounded-[50%] mt-1" />
                </div> 

                <div className={`relative group ${path === "/support" ? 'active': ''}`} >
                    <Link href="/support">
                        Support
                    </Link>
                    <div className="absolute invisible group-[.active]:visible top-full h-1 w-1 bg-bg-dark dark:bg-bg-light left-[50%] translate-x-[-50%] rounded-[50%] mt-1" />
                </div> 

                <ThemeToggle />
            </div>
        </div>
    )
}
