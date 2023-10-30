"use client";


import { EventStore } from "@/store/eventInfo";
import { fetchEventCentre } from "@/utils/eventUtils";
import { deleteCookie } from "cookies-next";
import { LayoutDashboardIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect, } from "react";
import { toast } from "sonner";


const Sidebar = () => {
    const router = useRouter()
    const { setEventDetails } = EventStore()

    useLayoutEffect(() => {
        const fetchEventDetails = async () => {
            try {

                const { message, data, status } = await fetchEventCentre()
                if (status !== 200) {
                    console.log(message);
                }
                console.log(data);
                setEventDetails(data)
            } catch (error) {
                console.log('Unable to fetch user details');
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
                    <nav className="flex md:h-screen md:p-6 lg:w-[210px] md:w-[190px] md:mx-auto md:flex md:justify-center lg:relative  fixed md:relative bottom-0 right-0 left-0  shadow-md bg-[#571b0b] md:shadow-none justify-between  py-4 z-50 active:z-50 m-6 px-6 md:m-0 md:px-0 rounded-lg md:rounded-none bg-white-1 ">
                        {/* Logos | Desktop | Mobile */}
                        {/* <BlackLogo className=" lg:border-b-2 pb-1 border-pink-barbie-1 hover:scale-110 duration-200 lg:block hidden cursor-pointer active:scale-100" /> */}

                        <nav className="my-10 md:block hidden">
                            <ul>
                                <Link href={`/dashboard`} className="">
                                    <li className="cursor-pointer bg-green-500 flex items-center space-x-2 py-2 px-4 rounded-lg text-white-1 mb-7 ">
                                        <LayoutDashboardIcon className="" />
                                        <span className="">Dashboard</span>
                                    </li>
                                </Link>

                                <Link href={`/profile`} className="">
                                    <li className="cursor-pointer bg-green-500 flex items-center space-x-2 p-2 rounded-lg text-white-1 mb-7 ">

                                        <span className="">Profile</span>
                                    </li>
                                </Link>
                                <Link href={`/bookings`} className="">
                                    <li className="cursor-pointer bg-green-500 flex items-center space-x-2 p-2 rounded-lg text-white-1 mb-7 ">

                                        <span className="">Bookings</span>
                                    </li>
                                </Link>

                            </ul>

                            <nav className="absolute bottom-0">
                                <button onClick={logOutUser} className="px-4 cursor-pointer flex items-center space-x-2 bg-green-500 py-2 rounded-lg text-white-1 mb-3">
                                    <span><LogOutIcon className="h-5 w-8" /></span>
                                    <span >Logout</span>
                                </button>

                            </nav>
                        </nav>

                        {/* <nav className=" block lg:hidden  bg-white-1  rounded-t-3xl "> */}

                        <ul className="flex justify-between gap-4 w-full md:hidden">
                            <Link href={`/dashboard`} className="hover:scale-125">
                                <li className="hover:scale-110 duration-200 flex flex-col items-center text-sm active:scale-100 cursor-pointer rounded-lg ">
                                    <LayoutDashboardIcon className="" />
                                    <span className="">Dashboard</span>
                                </li>
                            </Link>
                            <Link href={`/profile`} className="hover:scale-125">
                                <li className="hover:scale-110 duration-200 flex flex-col items-center text-sm active:scale-100 cursor-pointer rounded-lg ">
                                    <LayoutDashboardIcon className="" />
                                    <span className="">Profile</span>
                                </li>
                            </Link>
                            <Link href={`/booking`} className="hover:scale-125">
                                <li className="hover:scale-110 duration-200 flex flex-col items-center text-sm active:scale-100 cursor-pointer rounded-lg ">
                                    <LayoutDashboardIcon className="" />
                                    <span className="">Bookings</span>
                                </li>
                            </Link>
                        </ul>

                        {/* </nav> */}
                    </nav>
                </nav>
            </nav>
        </aside>
    );
};

export default Sidebar;
