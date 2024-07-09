'use client';
import Link from 'next/link';
import React, { useState } from 'react';

const Navbar = () => {
    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    };

    return (
        <nav className="">
            <div className="flex w-[95%] sm:w-[90%] mx-auto max-w-[1800px] justify-between py-6 items-center">
                <h1 className="font-bold text-[#095A66]">QUARVO</h1>

                <ul className="hidden w-[60%] lg:flex lg:gap-12 text-sm text-[#697489]">
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Special Offers </li>
                    <li>Contact Us</li>
                    <li>FAQ</li>
                </ul>
                <div className="hidden lg:flex gap-4 items-center">
                    <Link
                        href={'/login'}
                        className="text-xs flex items-center gap-2 bg-[#EBFFE1] text-[#095A66] px-8 py-3 rounded-full"
                    >
                        Login
                    </Link>
                    <Link
                        href={'/signup'}
                        className="text-xs flex items-center gap-2 text-[#EBFFE1] bg-[#095A66] px-8 py-3 rounded-full"
                    >
                        Signup
                    </Link>
                </div>

                <div onClick={handleNav} className="z-50 lg:hidden">
                    {nav ? (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6 text-[#B5CDD1] fixed -mt-4 right-2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                />
                            </svg>
                        </>
                    ) : (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6 absolute right-2 -mt-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        </>
                    )}
                </div>

                <ul
                    className={
                        nav
                            ? 'fixed lg:hidden right-0 top-0 w-[60%] pt-16 h-full bg-[#095A66] text-[#B5CDD1] ease-in-out duration-500'
                            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 right-[-100%]'
                    }
                >
                    <li className="p-4">Home</li>
                    <li className="p-4">About Us</li>
                    <li className="p-4">Special Offers </li>
                    <li className="p-4">Contact Us</li>
                    <li className="p-4">FAQ</li>
                    <Link
                        href={'/login'}
                        className="text-xs m-4 text-center flex justify-center items-center gap-2 bg-[#EBFFE1] text-[#095A66] px-8 py-3 rounded-full"
                    >
                        Login
                    </Link>
                    <Link
                        href={'/signup'}
                        className="text-xs m-4 text-center flex justify-center items-center gap- bg-[#EBFFE1] text-[#095A66] px-8 py-3 rounded-full"
                    >
                        Signup
                    </Link>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
