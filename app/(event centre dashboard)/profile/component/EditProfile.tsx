'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import Image from 'next/image';
import { EventCentreDetails } from '@/types/eventTypes';
import { Textarea } from '@/components/ui/textarea';
import { ChangeEvent, FormEvent, useState, useCallback } from 'react';
import { EventStore } from '@/store/eventInfo';
import {
    fetchEventCentreDetails,
    postEditCentreDetails,
} from '@/utils/eventUtils';
import { useDropzone } from 'react-dropzone';
import { uploadImagesToCloudinary } from '@/services/upload';
const EditProfile: React.FC<{ eventCentreDetails: EventCentreDetails }> = ({
    eventCentreDetails,
}) => {
    const { eventDetails } = EventStore();
    const [editProfileDetails, setEditProfileDetails] = useState({
        id: eventDetails?.id,
        amenities: eventCentreDetails.amenities,
        address: eventCentreDetails.address,
        description: eventCentreDetails.description,
        openDays: eventCentreDetails.open_days,
        price: eventCentreDetails.price,
        images: eventCentreDetails.images || [],
    });
    console.log(eventCentreDetails);
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState<any>([]);

    const onDrop = useCallback((acceptedFiles: (Blob | MediaSource)[]) => {
        if (acceptedFiles?.length) {
            setFiles((files: any[]) => [
                ...files,
                ...acceptedFiles.map((file: Blob | MediaSource) =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                ),
            ]);
        }
    }, []);
    const removeFile = (name: string) => {
        setFiles((files: File[]) =>
            files.filter((file: { name: string }) => file.name !== name)
        );
    };
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles: 4,
        accept: {
            'image/*': [],
        },
    });

    const stringToArray = (inputString: string, delimiter: string = ',') => {
        return inputString.split(delimiter).map((value) => value.trim());
    };

    const handleArrayInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newArray = stringToArray(e.target.value);
        setEditProfileDetails({
            ...editProfileDetails,
            amenities: newArray,
        });
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>,
        inputField: string
    ) => {
        const { value } = e.target;
        setEditProfileDetails((prevState) => ({
            ...prevState,
            [inputField]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const updatedImages =
                files.length === 0
                    ? eventCentreDetails?.images 
                    : await uploadImagesToCloudinary(files);
            const detailsToSubmit = {
                ...editProfileDetails,
                images: updatedImages,
            };
            const { message, data, status } = await postEditCentreDetails(
                detailsToSubmit
            );
            if (status !== 200) {
                console.log(message);
            }
            console.log(message, data);
            setLoading(false);
            fetchEventCentreDetails();
        } catch (error: any) {
            setLoading(false);
            console.error('Form submission error:', error.message);
        }
    };

    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <p className="cursor-pointer mb-12">Edit Profile</p>
                </SheetTrigger>
                <SheetContent className="min-h-[100vh] w-full overflow-y-scroll">
                    <SheetHeader>
                        <SheetTitle>Edit profile</SheetTitle>
                        <SheetDescription>
                            Make changes to your profile here. Click save when
                            you're done.
                        </SheetDescription>
                    </SheetHeader>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className="grid mt-4 gap-4">
                                <div>
                                    <label htmlFor="amenities">Amenities</label>
                                    <Input
                                        type="text"
                                        value={editProfileDetails.amenities.join()}
                                        placeholder="Amenities (Comma Seperated)"
                                        className="outline-none mt-1 border h-12"
                                        onChange={handleArrayInputChange}
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="price">Price</label>
                                    <Input
                                        type="text"
                                        value={editProfileDetails.price}
                                        onChange={(e) =>
                                            handleInputChange(e, 'price')
                                        }
                                        placeholder="Price"
                                        className="outline-none mt-1 border h-12"
                                    />
                                </div>
                            </div>

                            <div className="grid mt-4 gap-4">
                                <div className="">
                                    <label htmlFor="address">Address</label>
                                    <Input
                                        type="text"
                                        value={editProfileDetails.address}
                                        onChange={(e) =>
                                            handleInputChange(e, 'address')
                                        }
                                        placeholder="Address"
                                        className="outline-none mt-1 border h-12"
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="openingdays">
                                        Opening Days
                                    </label>
                                    <Input
                                        type="text"
                                        value={editProfileDetails.openDays}
                                        onChange={(e) =>
                                            handleInputChange(e, 'openDays')
                                        }
                                        placeholder="Opening Days"
                                        className="outline-none mt-1 border h-12"
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label htmlFor="description">Description</label>
                                <Textarea
                                    value={editProfileDetails.description}
                                    onChange={(e) =>
                                        setEditProfileDetails({
                                            ...editProfileDetails,
                                            description: e.target.value,
                                        })
                                    }
                                    placeholder="Description"
                                    className="outline-none border"
                                />
                            </div>
                        </div>
                        <div className="mt-6 w-full" {...getRootProps()}>
                            <label className="flex flex-col space-y-2">
                                <span>Change Event Centre Images:</span>
                                <input {...getInputProps()} name="images" />
                                {isDragActive ? (
                                    <p className="p-9 border-2 rounded-md w-full border-dashed border-slate-500 inline-block">
                                        Drop the evebt centres image here...
                                    </p>
                                ) : (
                                    <p className="p-9 border-2 rounded-md border-dashed border-slate-500 inline-block">
                                        Drag &apos;n&apos; product images here,
                                        or click to select files
                                    </p>
                                )}
                            </label>
                        </div>

                        <ul
                            className={` ${
                                files.length !== 0 ? 'border-2 p-2 mt-3 ' : ''
                            } flex gap-6 overflow-scroll`}
                        >
                            {files?.map((file: any) => (
                                <li
                                    key={file.name}
                                    className="w-40 flex items-center p-2"
                                >
                                    <Image
                                        src={file.preview}
                                        width={50}
                                        height={50}
                                        className="inline-block"
                                        alt={`${file.name}`}
                                        onLoad={() => {
                                            URL.revokeObjectURL(file.preview);
                                        }}
                                    />{' '}
                                    <div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6 cursor-pointer text-red-700"
                                            onClick={() =>
                                                removeFile(file.name)
                                            }
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                            />
                                        </svg>
                                    </div>
                                    <div></div>
                                </li>
                            ))}
                        </ul>
                        <SheetFooter>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="mb-24 md:mb-0 mt-6 w-full py-3 bg-[#095A66] hover:bg-[#095A66] text-white hover:text-white"
                            >
                                {loading ? 'Saving Changes' : 'Save changes'}
                            </Button>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        </>
    );
};

export default EditProfile;
