'use client';
import React, { Dispatch, SetStateAction } from 'react';

const BookedModal: React.FC<{
    setShowModal: Dispatch<SetStateAction<boolean>>;
}> = ({ setShowModal }) => {
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
                            The selected date is currently unavailable for
                            booking. We apologize for any inconvenience. Please
                            select an alternate date that meets your needs or yu
                            checkout other event centres. Thank you for your
                            understanding.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookedModal;
