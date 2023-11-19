import React, { useState } from 'react'

const AvailabilityModal = () => {

    const [open, setOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center z-[10000] min-h-screen">
                <p onClick={toggleModal} className="cursor-pointer">
                    Upload Images
                </p>
                {showModal && (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white relative z-[10000] p-2 rounded-lg w-[90%] md:w-1/2">
                            <span onClick={toggleModal} className="absolute right-4 top-0 cursor-pointer text-xl">
                                &times;
                            </span>

                            <div className="mt-6">
                                <label htmlFor="upload">{"Upload Image(s)"}</label>

                            </div>
                            <div className="mt-6 flex space-x-4 justify-end">
                                <button onClick={toggleModal} className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Close Modal
                                </button>

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default AvailabilityModal