'use client'
import { UserStore } from '@/store/userInfo'
import React, { Dispatch, SetStateAction } from 'react'

const BookedModal: React.FC<{ setShowModal: Dispatch<SetStateAction<boolean>> }> = ({ setShowModal }) => {
    const { userDetails } = UserStore()
    const toggleModal = () => {
        setShowModal(false);
    };
    return (
        <>

            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white relative z-[20000] p-4 rounded-lg w-[90%] md:w-1/2">
                    <span onClick={toggleModal} className="absolute right-4 top-0 cursor-pointer text-xl">
                        &times;
                    </span>

                    <div className="mt-6">
                        <p>The selected date is currently unavailable for booking. We apologize for any inconvenience. Please select an alternate date that meets your needs or yu checkout other event centres. Thank you for your understanding.</p>
                    </div>

                </div>
            </div>

        </>
    )
}

export default BookedModal