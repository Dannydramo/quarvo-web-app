import { create } from 'zustand'
import { bookedProps } from '@/types/eventTypes';

interface BookingStoreInterface {
    bookingDetails: bookedProps[];
    setBookingDetails: (bookingDetails: bookedProps[]) => void;
}

export const BookingStore = create<BookingStoreInterface>((set) => ({
    bookingDetails: [],
    setBookingDetails: (bookingDetails) => set({ bookingDetails }),
}))