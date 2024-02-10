"use client";
import BookedTable from "./BookedTable";
import { BookingStore } from "@/store/bookingInfo";

const BookingData = () => {
    const { bookingDetails } = BookingStore();
    return (
        <>
            <BookedTable bookedTable={bookingDetails} />
        </>
    );
};

export default BookingData;
