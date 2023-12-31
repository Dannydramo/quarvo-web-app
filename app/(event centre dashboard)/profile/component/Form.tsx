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
import { fetchEventCentreDetails, postEventCentreDetails } from "@/utils/eventUtils";
import { toast } from 'sonner'

const Form = () => {
    const { eventDetails } = EventStore()

    const [eventCentreDetails, setEventCentreDetails] = useState({
        id: eventDetails?.id,
        amenities: [''],
        address: '',
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
    const [loading, setLoading] = useState(false);


    const stateArr = stateLga?.map((state) => {
        return {
            value: state.toLowerCase(),
            label: state,
        }
    })



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
        const newArray = stringToArray(e.target.value);
        setEventCentreDetails({
            ...eventCentreDetails,
            amenities: newArray
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
            const { message, data, status } = await postEventCentreDetails(eventCentreDetails);
            if (status !== 200) {
                console.log(message);
            }
            console.log(message, data);
            setLoading(false);
            fetchEventCentreDetails()

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
                            <Input type="text" placeholder="Amenities (Comma Seperated)" className="outline-none mt-1 border h-12" onChange={handleArrayInputChange} />
                        </div>
                        <div className="">
                            <label htmlFor="price">Price</label>
                            <Input type="text" placeholder="Price" onChange={(e) => handleInputChange(e, "price")} className="outline-none mt-1 border h-12" />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 my-4">
                        <div className="">
                            <label htmlFor="address">Address</label>
                            <Input type="text" placeholder="Address" className="outline-none mt-1 border h-12" onChange={(e) => handleInputChange(e, "address")} />
                        </div>
                        <div className="">
                            <label htmlFor="openingdays">Opening Days</label>
                            <Input type="text" placeholder="Opening Days" onChange={(e) => handleInputChange(e, "openDays")} className="outline-none mt-1 border h-12" />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 my-4">
                        <div className="">
                            <label htmlFor="openitime">Opening Time</label>
                            <TimePicker use12Hours format="h:mm a" placeholder="Select Opening Time" className='outline-none mt-1 border h-12 w-full' onChange={onOpenTime} />
                        </div>
                        <div className="">
                            <label htmlFor="closetime">Closing Time</label>
                            <TimePicker use12Hours format="h:mm a" placeholder="Select Closing Time" className='outline-none mt-1 border h-12 w-full' onChange={onCloseTime} />
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

                    <div className="mt-4">
                        <label htmlFor="description">Description</label>
                        <Textarea placeholder="Description" onChange={(e) => setEventCentreDetails({
                            ...eventCentreDetails,
                            description: e.target.value
                        })} className="outline-none border" />
                    </div>

                </div>
                <Button type="submit" disabled={loading} className='bg-[#856D47] hover:bg-[#856D47] mb-12 md:mb-0 mt-4 outline-none text-white'>{loading ? "Submiting Details" : 'Submit Details'}</Button>
            </form>

        </>
    )
}

export default Form