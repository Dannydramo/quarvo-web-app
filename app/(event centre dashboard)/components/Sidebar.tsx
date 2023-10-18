"use client";

import Link from "next/link";
import React, { useState } from "react";


const Sidebar = () => {

    return (
        <aside className="lg:col-span-1">
            <nav className="fixed lg:relative bottom-0 right-0 left-0 bg-[#571b0b] z-50 active:z-50 md:shadow-none shadow-2xl">
                {/* Mobile Nav */}

                {/* Desktop nav */}
                <nav
                    className={`lg:h-screen lg:p-6 lg:w-[210px]  lg:mx-auto lg:flex lg:justify-center lg:relative  `}
                >
                    <nav className="flex lg:block shadow-md md:shadow-none lg:justify-normal justify-between  py-4 z-50 active:z-50 relative m-6 px-6 lg:m-0 lg:px-0 rounded-lg lg:rounded-none bg-white-1 ">
                        {/* Logos | Desktop | Mobile */}
                        {/* <BlackLogo className=" lg:border-b-2 pb-1 border-pink-barbie-1 hover:scale-110 duration-200 lg:block hidden cursor-pointer active:scale-100" /> */}

                        <nav className="my-10 lg:block hidden">
                            <ul>
                                <Link href={`/`} className="">
                                    <li className="cursor-pointer bg-green-500 p-2 rounded-lg text-white-1 mb-7 ">
                                        {/* <Home className="inline text-white-1" /> */}
                                        <span className="px-2">Dashboard</span>
                                    </li>
                                </Link>

                                <Link href={`/`} className="">
                                    <li className="cursor-pointer bg-green-500 p-2 rounded-lg text-white-1 mb-7 ">
                                        {/* <Home className="inline text-white-1" /> */}
                                        <span className="px-2">Home</span>
                                    </li>
                                </Link>

                                <Link href={`/`} className="">
                                    <li className="cursor-pointer bg-green-500 p-2 rounded-lg text-white-1 mb-7 ">
                                        {/* <Home className="inline text-white-1" /> */}
                                        <span className="px-2">Profile</span>
                                    </li>
                                </Link>

                                <Link href={`/`} className="">
                                    <li className="cursor-pointer bg-green-500 p-2 rounded-lg text-white-1 mb-7 ">
                                        {/* <Home className="inline text-white-1" /> */}
                                        <span className="px-2">Home</span>
                                    </li>
                                </Link>
                            </ul>

                            <nav className="absolute bottom-0 right-[40%]">
                                {/* <button onClick={logout}>
                    <Image
                      src={PowerOff}
                      width={30}
                      height={40}
                      alt="image"
                      className="hover:scale-125 duration-150 active:scale-100 cursor-pointer"
                    />
                  </button> */}
                                <Link href={`/`} className="">

                                    {/* <Home className="inline text-white-1" /> */}
                                    <span className="px-2 cursor-pointer bg-green-500 p-2 rounded-lg text-white-1 mb-7">Home</span>

                                </Link>
                            </nav>
                        </nav>

                        {/* <nav className=" block lg:hidden  bg-white-1  rounded-t-3xl "> */}

                        <ul className="flex justify-between gap-4 w-full lg:hidden">
                            <Link href={`/`} className="hover:scale-125">
                                <li className="hover:scale-110 duration-200 active:scale-100 cursor-pointer rounded-lg ">
                                    {/* <MobileHome className="inline text-black" /> */}
                                </li>
                            </Link>
                            <Link href={`/transactions`} className="hover:scale-125">
                                <li className="hover:scale-110 duration-200 active:scale-100 cursor-pointer rounded-lg ">
                                    {/* <MobileWallet className="inline text-black" /> */}
                                </li>
                            </Link>
                            <Link href={`/history`} className="hover:scale-125">
                                <li className="hover:scale-110 duration-200 active:scale-100 cursor-pointer rounded-lg ">
                                    {/* <MobileHistory className="inline text-black" /> */}
                                </li>
                            </Link>
                            <Link href={`/account`} className="hover:scale-125">
                                <li className="hover:scale-110 duration-200 active:scale-100 cursor-pointer rounded-lg ">
                                    {/* <MobileUserLogo className="inline text-black" /> */}
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
