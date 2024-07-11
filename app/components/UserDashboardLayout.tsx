'use client';

import { Button } from '@/components/ui/button';
import { UserStore } from '@/store/userInfo';
import { fetchUser } from '@/utils/userUtils';
import { LayoutDashboardIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const UserDashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [mobileToggle, setMobileToggle] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { userDetails, setUserDetails } = UserStore();
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const { message, data, status } = await fetchUser();
                if (status !== 200) {
                    console.log(message);
                }

                setUserDetails(data);
            } catch (error) {
                console.log('Unable to fetch user details');
            }
        };
        fetchUserDetails();
    }, []);
    return (
        <section className="flex w-full min-h-screen bg-[#F6F8FF]">
            <aside
                className={`z-20 lg:block top-0 left-0 lg:fixed w-64 p-4 h-full shadow-custom-light bg-white ${
                    mobileToggle ? 'fixed' : 'hidden'
                }`}
            >
                <div className="flex flex-col flex-grow pt-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 absolute top-0 right-0 m-4 lg:hidden"
                        onClick={() => {
                            setMobileToggle(false);
                        }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                    <div className="pl-4 text-lg font-semibold text-[#095A66]">
                        <h1>Quarvo</h1>
                    </div>
                </div>
                <div className="mt-8">
                    <nav className="flex flex-col space-y-4">
                        <Link
                            href={'/event-centres'}
                            className={`flex items-center font-medium text-xs sm:text-base space-x-2 px-6 py-3 rounded-md transition-all duration-700 hover:bg-[#095A66] hover:text-[#B5CDD1]  ${
                                pathname === '/event-centres' &&
                                'bg-[#095A66] text-[#B5CDD1]'
                            }`}
                        >
                            <LayoutDashboardIcon className="" />
                            <span className="">Event Centres</span>
                        </Link>
                        <Link
                            href={'/favourite-event-centres'}
                            className={`flex items-center font-medium text-xs sm:text-base space-x-2 px-6 py-3 rounded-md transition-all duration-700 hover:bg-[#095A66] hover:text-[#B5CDD1]  ${
                                pathname === '/favourite-event-centres' &&
                                'bg-[#095A66] text-[#B5CDD1]'
                            }`}
                        >
                            <LayoutDashboardIcon className="" />
                            <span className="">Favourite Centres</span>
                        </Link>
                        <Link
                            href={'/booked-event'}
                            className={`flex items-center font-medium text-xs sm:text-base space-x-2 px-6 py-3 rounded-md transition-all duration-700 hover:bg-[#095A66] hover:text-[#B5CDD1]  ${
                                pathname === '/booked-event' &&
                                'bg-[#095A66] text-[#B5CDD1]'
                            }`}
                        >
                            <LayoutDashboardIcon className="" />
                            <span className="">Booked Event</span>
                        </Link>
                        <Link
                            href={'/event-centres'}
                            className={`flex items-center font-medium text-xs sm:text-base space-x-2 px-6 py-3 rounded-md transition-all duration-700 hover:bg-[#095A66] hover:text-[#B5CDD1]  ${
                                pathname === '/event-centres' &&
                                'bg-[#095A66] text-[#B5CDD1]'
                            }`}
                        >
                            <LayoutDashboardIcon className="" />
                            <span className="">Account</span>
                        </Link>
                    </nav>
                </div>
                <div className="absolute bottom-0">
                    <Button
                        className="bg-transparent text-black hover:bg-transparent flex gap-3 w-full"
                        // onClick={handleLogout}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                id="Vector"
                                d="M11.8571 13V15.2857C11.8571 15.5888 11.7367 15.8796 11.5224 16.0938C11.3081 16.3081 11.0174 16.4286 10.7143 16.4286H2.71427C2.41116 16.4286 2.12047 16.3081 1.90615 16.0938C1.69182 15.8796 1.57141 15.5888 1.57141 15.2857V2.7143C1.57141 2.41119 1.69182 2.1205 1.90615 1.90618C2.12047 1.69185 2.41116 1.57144 2.71427 1.57144H10.7143C11.0174 1.57144 11.3081 1.69185 11.5224 1.90618C11.7367 2.1205 11.8571 2.41119 11.8571 2.7143V5.00001M8.42855 9.00001H16.4286M16.4286 9.00001L14.1428 6.7143M16.4286 9.00001L14.1428 11.2857"
                                strokeWidth="1.43"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                        Logout
                    </Button>
                </div>
            </aside>
            <div className="w-full flex-1 lg:ml-64 overflow-x-hidden">
                <header className="flex items-center h-16 px-4 py-2 sm:py-4 sm:px-6 border-b w-full border-gray-200">
                    <div className="">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 mr-2 lg:hidden"
                            onClick={() => {
                                setMobileToggle(true);
                            }}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </div>
                    <div className="flex w-full justify-between items-center">
                        <div className="">
                            <h1 className="text-sm sm:text-xl font-bold">
                                {userDetails?.first_name}
                            </h1>
                        </div>
                        <div className="hidden sm:block">
                            {new Date().toDateString()}
                        </div>
                    </div>
                </header>

                <main>{children}</main>
            </div>
        </section>
    );
};

export default UserDashboardLayout;
