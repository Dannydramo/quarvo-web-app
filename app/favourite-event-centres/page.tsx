'use client';
import React, { useEffect, useState } from 'react';
import UserDashboardLayout from '../components/UserDashboardLayout';
import {
    getFavouriteEventCentres,
    removeFromFravourite,
} from '@/services/favourite';
import { UserStore } from '@/store/userInfo';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
const page = () => {
    const { userDetails } = UserStore();
    const [favouritesData, setFavouritesData] = useState<any[]>([]);
    const fetchUserFaouriteEventCentres = async () => {
        const { status, message, data } = await getFavouriteEventCentres(
            userDetails?.id!
        );
        if (status !== 200) {
            console.log('Error fetching event centres');
            return;
        }
        setFavouritesData(data);
    };
    useEffect(() => {
        userDetails && fetchUserFaouriteEventCentres();
    }, [userDetails]);
    const formatDateToWords = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };
    const handleRemoveFavourite = async (eventCentreId: string) => {
        try {
            const { status, message } = await removeFromFravourite({
                userId: userDetails?.id,
                eventCentreId,
            });
            if (status === 200) {
                toast.success('Product removed from wishlist');
                fetchUserFaouriteEventCentres();
            } else {
                toast.error(message);
            }
        } catch (error) {
            console.error('Error removing product from wishlist:', error);
            toast.error('Failed to remove product from wishlist');
        }
    };
    return (
        <UserDashboardLayout>
            <section className="mx-auto mt-8 overflow-x-hidden w-[95%] sm:w-[90%]">
                <h1 className="my-2 mb-6 text-2xl font-semibold">
                    Favourite Event Centres
                </h1>
                {favouritesData.length > 0 ? (
                    <>
                        <div className="w-full">
                            {favouritesData.map((favourite) => (
                                <div
                                    key={favourite.id}
                                    className="flex space-x-6 justify-between items-center h-fit pb-4 w-full lg:w-[90%] xl:w-[70%] mt-4 border-b"
                                >
                                    <div className="flex gap-6 items-center">
                                        <div className="bg-gray-200 p-4 rounded-sm w-fit relative">
                                            <Image
                                                src={
                                                    favourite
                                                        .event_centre_details
                                                        ?.images[0]!
                                                }
                                                alt="Event Centre image"
                                                height={50}
                                                width={50}
                                                className="h-[30px] w-[30px] lg:w-[50px] lg:h-[50px]"
                                            />
                                            <div className="absolute sm:hidden top-0 right-0">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-4 h-4"
                                                    onClick={() =>
                                                        handleRemoveFavourite(
                                                            favourite.id
                                                        )
                                                    }
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M6 18 18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm sm:text-base">
                                                {favourite.event_centre_name}
                                            </p>
                                            <Link
                                                href={`/event-centre/${favourite.slug}`}
                                                className="border sm:hidden mt-4 text-xs w-fit rounded-md p-3 sm:py-3 sm:px-6"
                                            >
                                                View Event Centre Details
                                            </Link>
                                            <div className="hidden sm:flex sm:flex-col space-y-1">
                                                {' '}
                                                <p>
                                                    Added on:{' '}
                                                    {formatDateToWords(
                                                        favourite?.created_at
                                                    )}
                                                </p>
                                                <p
                                                    className="font-semibold cursor-pointer"
                                                    onClick={() =>
                                                        handleRemoveFavourite(
                                                            favourite.id
                                                        )
                                                    }
                                                >
                                                    Remove item
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden sm:flex items-center gap-6">
                                        <p>
                                            {' '}
                                            ₦
                                            {
                                                favourite.event_centre_details
                                                    ?.price
                                            }
                                        </p>
                                        <Link
                                            href={`/event-centre/${favourite.slug!}`}
                                            className="border rounded-md py-3 px-6"
                                        >
                                            View Event Centre Details Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="text-center mx-auto mt-12">
                            <div className="mb-8">
                                <p>
                                    Your wishlist history is waiting to be
                                    filled.
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </section>
        </UserDashboardLayout>
    );
};

export default page;
