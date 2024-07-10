'use client';
import { eventRegDetails } from '@/types/eventTypes';
import React, { Dispatch, SetStateAction } from 'react';
import Payment from './Payment';

const AvailableModal: React.FC<{
    eventCentre: eventRegDetails;
    date: string | undefined;
    eventPrice: string;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}> = ({ eventCentre, date, setShowModal, eventPrice }) => {
    const toggleModal = () => {
        setShowModal(false);
    };
    return (
        <>
            <div onClick={toggleModal} className="fixed top-0 left-0 p-2 w-full h-full z-[10000] flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white relative z-[20000] p-4 sm:p-8 rounded-lg w-[90%] md:w-1/2">
                    <span
                        onClick={toggleModal}
                        className="absolute right-4 top-2 cursor-pointer text-xl"
                    >
                        &times;
                    </span>

                    <div className="mt-6 text-sm sm:text-base">
                        <p>
                            The selected date is available for booking. To
                            proceed, please complete the payment process and
                            confirm the reservation. This will ensure that the
                            date is reserved for you and that the booking is
                            finalized. Thank you for your interest.
                        </p>
                    </div>

                    <div className="flex justify-end items-end mt-8">
                        {' '}
                        <Payment
                            eventCentre={eventCentre}
                            date={date}
                            eventPrice={eventPrice}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AvailableModal;
