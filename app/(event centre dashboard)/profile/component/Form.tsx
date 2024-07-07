'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChangeEvent, FormEvent, useState, useCallback } from 'react';
import type { Dayjs } from 'dayjs';
import { TimePicker } from 'antd';
import { EventStore } from '@/store/eventInfo';
import NaijaStates from 'naija-state-local-government';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
    fetchEventCentreDetails,
    postEventCentreDetails,
} from '@/utils/eventUtils';
import { toast } from 'sonner';
import { uploadImagesToCloudinary } from '@/services/upload';

const Form = () => {
    const { eventDetails } = EventStore();
    console.log(eventDetails?.id);

    const [eventCentreDetails, setEventCentreDetails] = useState({
        id: eventDetails?.id,
        amenities: [''],
        address: '',
        openingTime: '',
        closingTime: '',
        lga: '',
        description: '',
        openDays: '',
        price: '',
        images: [''],
    });
    const [open, setOpen] = useState(false);
    const state = eventDetails?.state;
    const stateLga: string[] = state ? NaijaStates.lgas(state).lgas : [];
    const [value, setValue] = useState('');
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
        maxFiles: 10,
        accept: {
            'image/*': [],
        },
    });
    const stateArr = stateLga?.map((state) => {
        return {
            value: state.toLowerCase(),
            label: state,
        };
    });

    const onOpenTime = (time: Dayjs | null, timeString: string) => {
        if (time) {
            setEventCentreDetails({
                ...eventCentreDetails,
                openingTime: timeString,
            });
        }
    };

    const onCloseTime = (time: Dayjs | null, timeString: string) => {
        if (time) {
            setEventCentreDetails({
                ...eventCentreDetails,
                closingTime: timeString,
            });
        }
    };

    const stringToArray = (inputString: string, delimiter: string = ',') => {
        return inputString.split(delimiter).map((value) => value.trim());
    };

    const handleArrayInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newArray = stringToArray(e.target.value);
        setEventCentreDetails({
            ...eventCentreDetails,
            amenities: newArray,
        });
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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const uploadedImages = await uploadImagesToCloudinary(files);
            const detailsToSubmit = {
                ...eventCentreDetails,
                images: uploadedImages,
            };
            const { message, data, status } = await postEventCentreDetails(
                detailsToSubmit
            );
            if (status !== 200) {
                toast.error(message);
                console.log(message);
            }

            setLoading(false);
            fetchEventCentreDetails();
        } catch (error: any) {
            setLoading(false);
            console.error('Form submission error:', error.message);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="grid md:grid-cols-2 gap-4 my-4">
                        <div>
                            <label htmlFor="amenities">Amenities</label>
                            <Input
                                type="text"
                                placeholder="Amenities (Comma Seperated)"
                                className="outline-none mt-1 border h-12"
                                onChange={handleArrayInputChange}
                            />
                        </div>
                        <div className="">
                            <label htmlFor="price">Price</label>
                            <Input
                                type="text"
                                placeholder="Price"
                                onChange={(e) => handleInputChange(e, 'price')}
                                className="outline-none mt-1 border h-12"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 my-4">
                        <div className="">
                            <label htmlFor="address">Address</label>
                            <Input
                                type="text"
                                placeholder="Address"
                                className="outline-none mt-1 border h-12"
                                onChange={(e) =>
                                    handleInputChange(e, 'address')
                                }
                            />
                        </div>
                        <div className="">
                            <label htmlFor="openingdays">Opening Days</label>
                            <Input
                                type="text"
                                placeholder="Opening Days"
                                onChange={(e) =>
                                    handleInputChange(e, 'openDays')
                                }
                                className="outline-none mt-1 border h-12"
                            />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 my-4">
                        <div className="">
                            <label htmlFor="openitime">Opening Time</label>
                            <TimePicker
                                use12Hours
                                format="h:mm a"
                                placeholder="Select Opening Time"
                                className="outline-none mt-1 border h-12 w-full"
                                onChange={onOpenTime}
                            />
                        </div>
                        <div className="">
                            <label htmlFor="closetime">Closing Time</label>
                            <TimePicker
                                use12Hours
                                format="h:mm a"
                                placeholder="Select Closing Time"
                                className="outline-none mt-1 border h-12 w-full"
                                onChange={onCloseTime}
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="lga">L.G.A</label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className={`w-full h-12 flex justify-between mt-1`}
                                >
                                    {value
                                        ? stateArr.find(
                                              (state) => state.value === value
                                          )?.label
                                        : 'Select Local Government Area'}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full md:max-w-[100%] p-0 max-h-[15rem] overflow-y-scroll">
                                <Command>
                                    <CommandInput placeholder="Search Local Government Area" />
                                    <CommandEmpty>
                                        No Local Government Area found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {stateArr.map((state) => (
                                            <CommandItem
                                                key={state.value}
                                                onSelect={(
                                                    currentValue: any
                                                ) => {
                                                    setValue(
                                                        currentValue === value
                                                            ? ''
                                                            : currentValue
                                                    );
                                                    setEventCentreDetails({
                                                        ...eventCentreDetails,
                                                        lga: currentValue,
                                                    });
                                                    setOpen(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        'mr-2 h-4 w-4',
                                                        value === state.value
                                                            ? 'opacity-100'
                                                            : 'opacity-0'
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

                    <div className="mt-4">
                        <label htmlFor="description">Description</label>
                        <Textarea
                            placeholder="Description"
                            onChange={(e) =>
                                setEventCentreDetails({
                                    ...eventCentreDetails,
                                    description: e.target.value,
                                })
                            }
                            className="outline-none border"
                        />
                    </div>
                </div>
                <div className="mt-6 w-full" {...getRootProps()}>
                    <label className="flex flex-col space-y-2">
                        <span>Add Event Centre Images:</span>
                        <input {...getInputProps()} name="images" />
                        {isDragActive ? (
                            <p className="p-9 border-2 rounded-md w-full border-dashed border-slate-500 inline-block">
                                Drop the event centre images here...
                            </p>
                        ) : (
                            <p className="p-9 border-2 rounded-md border-dashed border-slate-500 inline-block">
                                Drag &apos;n&apos; event centre images here, or
                                click to select files
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
                                    onClick={() => removeFile(file.name)}
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
                <Button
                    type="submit"
                    disabled={loading}
                    className="my-4 w-full py-3 bg-[#095A66] hover:bg-[#095A66] text-white hover:text-white"
                >
                    {loading ? (
                        <svg
                            className="w-5 h-5 text-white animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    ) : (
                        'Submit'
                    )}
                </Button>
            </form>
        </>
    );
};

export default Form;
