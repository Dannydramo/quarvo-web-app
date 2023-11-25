"use client";

import { EventStore } from "@/store/eventInfo";
import Booking from "@/svgs/Booking";
import Profile from "@/svgs/Profile";
import { fetchEventCentre } from "@/utils/eventUtils";
import { deleteCookie } from "cookies-next";
import { LayoutDashboardIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect, } from "react";
import { toast } from "sonner";
import { usePathname } from "next/navigation";


const Sidebar = () => {
    const router = useRouter()
    const { setEventDetails } = EventStore()
    const pathname = usePathname()

    useLayoutEffect(() => {
        const fetchEventDetails = async () => {
            try {

                const { message, data, status } = await fetchEventCentre()
                if (status !== 200) {
                    console.log(message);
                }
                setEventDetails(data)
            } catch (error) {
                console.log('Unable to fetch event details');
            }
        }
        fetchEventDetails()
    }, [])

    const logOutUser = () => {
        deleteCookie("jwtToken");
        toast.success('Logout Succesful')
        router.replace('/event-center-login')
    }

    return (
        <aside>
            <nav>

                <nav
                >
                    <nav className="flex md:h-screen md:p-6 lg:w-[210px] md:w-[190px] md:mx-auto z-[10000] md:flex md:justify-center lg:relative fixed md:relative bottom-0 right-0 left-4 md:left-0  shadow-md bg-[#856D47] md:shadow-none justify-between py-4 z-100 active:z-100 m-6 px-6 md:m-0 md:px-0 rounded-lg md:rounded-none bg-white-1 ">
                        {/* Logos | Desktop | Mobile */}
                        {/* <BlackLogo className=" lg:border-b-2 pb-1 border-pink-barbie-1 hover:scale-110 duration-200 lg:block hidden cursor-pointer active:scale-100" /> */}

                        <nav className="my-10 z-[10000] md:block hidden">
                            <ul>
                                <Link href={`/dashboard`} className="">
                                    <li className="cursor-pointer bg-white flex items-center space-x-2 py-2 px-4 rounded-lg mb-7 ">
                                        <LayoutDashboardIcon className="" />
                                        <span className="">Dashboard</span>
                                    </li>
                                </Link>

                                <Link href={`/profile`} className="">
                                    <li className="cursor-pointer bg-white flex items-center space-x-2 py-2 px-4 rounded-lg mb-7 ">
                                        <Profile />
                                        <span className="">Profile</span>
                                    </li>
                                </Link>
                                <Link href={`/bookings`} className="">
                                    <li className="cursor-pointer bg-white flex items-center space-x-2 py-2 px-4 rounded-lg mb-7 ">
                                        <Booking />
                                        <span className="">Bookings</span>
                                    </li>
                                </Link>

                            </ul>

                            <nav className="absolute bottom-0">
                                <button onClick={logOutUser} className="px-4 cursor-pointer flex items-center space-x-2 bg-white py-2 rounded-lg mb-3">
                                    <span><LogOutIcon className="h-5 w-8" /></span>
                                    <span >Logout</span>
                                </button>

                            </nav>
                        </nav>

                        <ul className="flex justify-between gap-4 z-[10000] w-full md:hidden">
                            <Link href={`/dashboard`}>
                                <li className={`flex ${pathname === '/dashboard' && 'bg-white'} space-x-2 py-2 px-3 items-center text-sm active:scale-100 cursor-pointer rounded-3xl`}>
                                    <LayoutDashboardIcon className="h-6" />
                                    <span className={`${pathname === '/dashboard' ? 'block' : 'hidden'}`}>Dashboard</span>
                                </li>
                            </Link>
                            <Link href={`/profile`}>
                                <li className={`flex ${pathname === '/profile' && 'bg-white'} space-x-2 py-2 px-3 items-center text-sm active:scale-100 cursor-pointer rounded-3xl`}>
                                    <Profile className="h-6" />
                                    <span className={`${pathname === '/profile' ? 'block' : 'hidden'}`}>Profile</span>
                                </li>
                            </Link>
                            <Link href={`/bookings`}>
                                <li className={`flex ${pathname === '/bookings' && 'bg-white'} space-x-2 py-2 px-3 items-center text-sm active:scale-100 cursor-pointer rounded-3xl`}>
                                    <Booking className="h-6" />
                                    <span className={`${pathname === '/bookings' ? 'block' : 'hidden'}`}>Bookings</span>
                                </li>
                            </Link>
                        </ul>

                    </nav>
                </nav>
            </nav>
        </aside>
    );
};

export default Sidebar;
