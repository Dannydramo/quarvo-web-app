'use client';
import {
    getFavouriteStatus,
    postFavouriteEventCentres,
    removeFromFravourite,
} from '@/services/favourite';
import { UserStore } from '@/store/userInfo';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const Favourites = ({ eventCentreId }: { eventCentreId: string }) => {
    const [isFavourite, setIsFavourite] = useState(false);
    const [loading, setLoading] = useState(false);
    const { userDetails } = UserStore();

    const fetchFavouriteStatus = async () => {
        const { status, message, data } = await getFavouriteStatus({
            userId: userDetails?.id,
            eventCentreId,
        });
        if (status !== 200) {
            console.log(message);
            return;
        }
        setIsFavourite(data);
        console.log(status);
    };

    useEffect(() => {
        userDetails && fetchFavouriteStatus();
    }, [userDetails]);

    const handleAddToFavourite = async () => {
        if (!userDetails) {
            toast.error('Please log in before adding product to wishlist');
            return;
        }
        try {
            setLoading(true);
            const { status, message } = await postFavouriteEventCentres({
                userId: userDetails.id,
                eventCentreId,
            });
            if (status === 200) {
                setLoading(false);
                toast.success(message);
                setIsFavourite(true);
                fetchFavouriteStatus();
            } else {
                toast.error(message);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error adding product to wishlist:', error);
            toast.error('Failed to add product to wishlist');
            setLoading(false);
        }
    };

    const handleRemoveFavorite = async () => {
        try {
            setLoading(true);
            const { status, message } = await removeFromFravourite({
                userId: userDetails?.id,
                eventCentreId,
            });
            if (status === 200) {
                setLoading(false);
                toast.success('Product removed from wishlist');
                setIsFavourite(false);
                fetchFavouriteStatus();
            } else {
                setLoading(false);
                toast.error(message);
            }
        } catch (error) {
            setLoading(false);
            console.error('Error removing product from wishlist:', error);
            toast.error('Failed to remove product from wishlist');
        }
    };

    return (
        <div className="bg-white p-2 rounded">
            {!loading && !isFavourite && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 cursor-pointer"
                    onClick={handleAddToFavourite}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                </svg>
            )}
            {!loading && isFavourite && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#E17862"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#E17862"
                    className="w-5 h-5 cursor-pointer"
                    onClick={handleRemoveFavorite}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                </svg>
            )}
            {loading && (
                <svg
                    className="w-5 h-5 text-black animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
            )}
        </div>
    );
};

export default Favourites;
