"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EventStore } from "@/store/eventInfo";
import Spinner from "@/svgs/Spinner";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

const UploadImage = () => {
    const { eventDetails } = EventStore();
    const [multipleFiles, setMultipleFiles] = useState<File[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleMultipleFileChange = async (
        e: ChangeEvent<HTMLInputElement>
    ) => {
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
            setLoading(true);
            const base64Files = await Promise.all(
                multipleFiles.map(convertFileToBase64)
            );
            const res = await fetch("/api/uploadFile", {
                method: "POST",
                body: JSON.stringify({
                    id: eventDetails?.id,
                    imageFile: base64Files,
                }),
            });
            const data = await res.json();
            if (data.status === 200) {
                toast.success(data.message);
                setShowModal(false);
                return;
            } else {
                toast.error("Failed to upload logo");
                setShowModal(false);
                return;
            }
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            toast.error("Unable to upload images. Please try again later");
            console.log(error.message);
            setShowModal(false);
            return;
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center z-[10000] min-h-screen">
                <p onClick={toggleModal} className="cursor-pointer">
                    Upload Images
                </p>
                {loading && (
                    <>
                        <div className="absolute p-2 bg-white flex items-center space-x-3 z-[20000] top-4 right-4 rounded-md">
                            <Spinner className="h-6 w-6 bg-white text-white animate-spin" />
                            <p>Uploading Images..</p>
                        </div>
                    </>
                )}
                {showModal && (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[10000] bg-gray-800 bg-opacity-50">
                        <div className="bg-white relative z-[20000] p-2 rounded-lg w-[90%] md:w-1/2">
                            <span
                                onClick={toggleModal}
                                className="absolute right-4 top-0 cursor-pointer text-xl"
                            >
                                &times;
                            </span>

                            <div className="mt-6">
                                <label htmlFor="upload">
                                    {"Upload Image(s)"}
                                </label>
                                <Input
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    multiple
                                    onChange={handleMultipleFileChange}
                                    className="outline-none mt-3 border h-12 mr-2"
                                />
                            </div>
                            <div className="mt-6 flex space-x-4 justify-end">
                                <Button
                                    className="bg-[#856D47] font-bold text-sm py-2 px-4 rounded hover:bg-[#856D47]"
                                    onClick={() => handleImageUpload()}
                                >
                                    {loading
                                        ? "Uploading Images"
                                        : "Upload Images"}
                                </Button>
                                <Button
                                    onClick={toggleModal}
                                    className="bg-red-500 hover:bg-red-500 text-sm text-white font-bold py-2 px-4 rounded"
                                >
                                    Close Modal
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default UploadImage;
