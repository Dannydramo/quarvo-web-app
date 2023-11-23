'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EventStore } from "@/store/eventInfo";
import { ChangeEvent, useState } from "react";

const UploadImage = () => {
    const { eventDetails } = EventStore();
    const [multipleFiles, setMultipleFiles] = useState<File[]>([]);
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleMultipleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setMultipleFiles(files);
        if (multipleFiles.length === 0) return;
    };

    const convertFileToBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve(e.target?.result);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleImageUpload = async () => {
        try {
            const base64Files = await Promise.all(multipleFiles.map(convertFileToBase64));
            const res = await fetch('/api/uploadFile', {
                method: 'POST',
                body: JSON.stringify({
                    id: eventDetails?.id,
                    imageFile: base64Files
                }),
            });
            const data = await res.json();
            console.log(data);
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center z-[10000] min-h-screen">
                <p onClick={toggleModal} className="cursor-pointer">
                    Upload Images
                </p>
                {showModal && (
                    <div onClick={toggleModal} className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white relative z-[10000] p-2 rounded-lg w-[90%] md:w-1/2">
                            <span onClick={toggleModal} className="absolute right-4 top-0 cursor-pointer text-xl">
                                &times;
                            </span>

                            <div className="mt-6">
                                <label htmlFor="upload">{"Upload Image(s)"}</label>
                                <Input type="file" accept=".jpg, .jpeg, .png" multiple onChange={handleMultipleFileChange} className="outline-none mt-3 border h-12 mr-2" />
                            </div>
                            <div className="mt-6 flex space-x-4 justify-end">
                                <button onClick={toggleModal} className="bg-red-500 text-white font-bold py-2 px-4 rounded">
                                    Close Modal
                                </button>
                                <Button className="bg-[#856D47] font-bold py-2 px-4 rounded hover:bg-[#856D47]" onClick={() => handleImageUpload()}>Upload</Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default UploadImage;
