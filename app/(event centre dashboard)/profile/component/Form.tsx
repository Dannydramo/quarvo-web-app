'use client'

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, FormEvent, useState } from "react";
import type { Dayjs } from 'dayjs';
import { TimePicker } from 'antd';
import { EventStore } from "@/store/eventInfo";
import NaijaStates from 'naija-state-local-government'
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { postEventCentreDetails } from "@/utils/eventUtils";

const Form = () => {
    const { eventDetails } = EventStore()

    const [eventCentreDetails, setEventCentreDetails] = useState({
        id: eventDetails?.id,
        amenities: [''],
        address: '',
        mainImage: '',
        images: [''],
        video: '',
        openingTime: '',
        closingTime: '',
        lga: '',
        description: '',
        openDays: '',
        price: ''
    })
    const [open, setOpen] = useState(false)
    const state = eventDetails?.state
    const stateLga: string[] = state ? NaijaStates.lgas(state).lgas : [];
    const [value, setValue] = useState("")

    const stateArr = stateLga?.map((state) => {
        return {
            value: state,
            label: state,
        }
    })

    const [multipleFiles, setMultipleFiles] = useState<File[]>([]);
    const [videoFile, setVideoFile] = useState<File>()

    const handleMultipleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setMultipleFiles(files);
        if (multipleFiles.length === 0) return;


    };

    const handleVideoChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Get the first selected file

        setVideoFile(file)
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

    const onOpenTime = (time: Dayjs | null, timeString: string) => {
        if (time) {
            setEventCentreDetails({
                ...eventCentreDetails,
                openingTime: timeString
            })
        }
    };
    const onCloseTime = (time: Dayjs | null, timeString: string) => {
        if (time) {
            setEventCentreDetails({
                ...eventCentreDetails,
                closingTime: timeString
            })
        }
    };

    const stringToArray = (inputString: string, delimiter: string = ',') => {
        return inputString.split(delimiter).map(value => value.trim());
    };

    const handleArrayInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Assuming that values are separated by a comma
        const newArray = stringToArray(e.target.value);
        setEventCentreDetails({

            ...eventCentreDetails,
            amenities: newArray
        }
        )

    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>,
        inputField: string
    ) => {
        const { value } = e.target;
        setEventCentreDetails((prevState) => ({
            ...prevState,
            [inputField]: value,
        }));

    };

    const handleImageUpload = async (files: File[]): Promise<string[]> => {
        try {
            console.log('Uploading images');
            const base64Files = await Promise.all(files.map(convertFileToBase64));
            const res = await fetch('/api/uploadFile', {
                method: 'POST',
                body: JSON.stringify(base64Files),
            });
            const data = await res.json();
            const secureUrls = data.uploadedImages.map((image: { secure_url: string }) => image.secure_url);
            console.log(secureUrls)
            return secureUrls;
        } catch (error: any) {
            console.error('Image upload error:', error.message);
            throw error;
        }
    };

    const handleVideoUpload = async (file: File | undefined): Promise<string | undefined> => {
        if (!file) {
            return undefined;
        }

        try {
            console.log('Uploading video');
            const base64File = await convertFileToBase64(file);
            const res = await fetch('/api/uploadVideo', {
                method: 'POST',
                body: JSON.stringify(base64File),
            });
            const data = await res.json();
            const videoUrl = data?.uploadedVideo.secure_url;
            console.log(videoUrl);

            return videoUrl;
        } catch (error: any) {
            console.error('Video upload error:', error.message);
            throw error;
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const videoUrl = await handleVideoUpload(videoFile);
            const imageUrls = await handleImageUpload(multipleFiles);
            console.log(videoUrl, imageUrls)
            setEventCentreDetails((prevDetails) => {
                return {
                    ...prevDetails,
                    images: imageUrls,
                    mainImage: imageUrls[0],
                    video: videoUrl || '',
                };
            });

            console.log('Event details:', eventCentreDetails);
            const { message, data, status } = await postEventCentreDetails(eventCentreDetails)
            if (status !== 200) {
                console.log(message);
            }
            console.log(message);
            console.log(data)
        } catch (error: any) {
            console.error('Form submission error:', error.message);
        }
    };



    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="grid md:grid-cols-2 gap-4 my-4">
                        <Input type="text" placeholder="Amenities (Comma Seperated)" className="outline-none mt-1 border h-12" onChange={handleArrayInputChange} />
                        <Input type="text" placeholder="Price" onChange={(e) => handleInputChange(e, "price")} className="outline-none mt-1 border h-12" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 my-4">
                        <Input type="text" placeholder="Address" className="outline-none mt-1 border h-12" onChange={(e) => handleInputChange(e, "address")} />
                        <Input type="text" placeholder="Opening Days" onChange={(e) => handleInputChange(e, "openDays")} className="outline-none mt-1 border h-12" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 my-4">
                        <TimePicker use12Hours format="h:mm a" placeholder="Select Opening Time" className='outline-none mt-1 border h-12 w-full' onChange={onOpenTime} />
                        <TimePicker use12Hours format="h:mm a" placeholder="Select Closing Time" className='outline-none mt-1 border h-12 w-full' onChange={onCloseTime} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 my-4">
                        <Input type="file" accept=".mp4" className="outline-none mt-1 border h-12" onChange={handleVideoChange} />
                        <Input type="file" accept=".jpg, .jpeg, .png" multiple onChange={handleMultipleFileChange} className="outline-none mt-1 border h-12" />
                    </div>
                    <div className="">
                        <div className="">
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className={`w-full h-10 flex justify-between mt-1 `}
                                    >
                                        {value
                                            ? stateArr.find((state) => state.value === value)?.label
                                            : "Select Local Government Area"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full md:max-w-[100%] p-0 max-h-[15rem] overflow-y-scroll">
                                    <Command>
                                        <CommandInput placeholder="Search Local Government Area" />
                                        <CommandEmpty>No Local Government Area found.</CommandEmpty>
                                        <CommandGroup>
                                            {stateArr.map((state) => (
                                                <CommandItem
                                                    key={state.value}
                                                    onSelect={(currentValue) => {
                                                        setValue(currentValue === value ? "" : currentValue)
                                                        setEventCentreDetails({
                                                            ...eventCentreDetails,
                                                            lga: currentValue
                                                        })
                                                        setOpen(false)
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            value === state.value ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {state.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <Textarea placeholder="Description" onChange={(e) => setEventCentreDetails({
                        ...eventCentreDetails,
                        description: e.target.value
                    })} className="outline-none mt-4 border" />

                </div>
                <Button type="submit" className="mt-4 outline-none">Submit Details</Button>
            </form>

        </>
    )
}

export default Form