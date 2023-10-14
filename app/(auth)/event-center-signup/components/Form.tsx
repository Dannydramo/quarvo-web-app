'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { ChangeEvent, FormEvent, useState } from 'react'
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
import NaijaStates from 'naija-state-local-government'
import { EventCentreReg } from '@/types/onboarding';
import { toast } from 'sonner'

const Form = () => {
    const [eventRegisterDetails, setEventRegisterDetails] = useState<EventCentreReg>({
        eventCentreName: '',
        email: '',
        password: '',
        phoneNumber: '',
        state: '',
        confirmPassword: ''
    })

    const [inputValidity, setInputValidity] = useState({
        eventCentreName: false,
        state: false,
        phoneNumber: false,
        password: false,
        email: false,
        confirmPassword: false,
    });


    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [loading, setLoading] = useState(false)
    const states: String[] = NaijaStates.states()

    const stateArr = states.map((state) => {
        return {
            value: state.toLocaleLowerCase(),
            label: state,
        }
    })


    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>,
        inputField: string
    ) => {
        const { value } = e.target;
        setEventRegisterDetails((prevState) => ({
            ...prevState,
            [inputField]: value,
        }));

        // Reset inputValidity to false when input value changes
        setInputValidity((prevState) => ({
            ...prevState,
            [inputField]: false,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check if all fields are filled
        for (const key in eventRegisterDetails) {
            if (!eventRegisterDetails[key as keyof EventCentreReg]) {
                // If the field is empty, set its validity to true
                setInputValidity((prevState) => ({
                    ...prevState,
                    [key]: true,
                }));
            }
        }

        if (eventRegisterDetails.password !== eventRegisterDetails.confirmPassword) {
            return
        }

        try {
            setLoading(true)
            const res = await fetch('/api/event-center-signup', {
                method: "POST",
                body: JSON.stringify(eventRegisterDetails)
            })

            if (res.status !== 200) {
                const errorData = await res.json()
                console.log(errorData.message);
            }

            const data = await res.json()

            if (data.status !== 200) {
                toast.error(data.message)
                setLoading(false)
            } else {
                toast.success(data.message)
                setLoading(false)
            }

        } catch (error) {
            toast.error('Unable to process form submission')
            setLoading(false)
        }

    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                    <div className="">
                        <label htmlFor="eventname">Event Centre Name</label>
                        <Input type="text" className={`outline-none mt-1 border focus:border-none ${inputValidity.eventCentreName ? "border-red-500" : ""}`} onChange={(e) => handleInputChange(e, "eventCentreName")} />
                        {inputValidity.eventCentreName && (
                            <p className="text-red-500 text-sm mt-1">
                                Event Centre Name is required.
                            </p>
                        )}
                    </div>
                    <div className="">
                        <label htmlFor="phone">Phone Number</label>
                        <Input type="tel" maxLength={11} minLength={11} className={`outline-none mt-1 border focus:border-none ${inputValidity.phoneNumber ? "border-red-500" : ""}`} onChange={(e) => handleInputChange(e, "phoneNumber")} />
                        {inputValidity.phoneNumber && (
                            <p className="text-red-500 text-sm mt-1">
                                Phone Number is required.
                            </p>
                        )}
                    </div>
                    <div className="">
                        <label htmlFor="email">Email</label>
                        <Input type="email" className={`outline-none mt-1 border focus:border-none ${inputValidity.email ? "border-red-500" : ""}`} onChange={(e) => handleInputChange(e, "email")} />
                        {inputValidity.email && (
                            <p className="text-red-500 text-sm mt-1">
                                Email Address is required.
                            </p>
                        )}
                    </div>
                    <div className=''>
                        <label htmlFor="state">Select State</label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className={`w-full h-10 flex justify-between mt-1 ${inputValidity.state ? "border-red-500" : ""}`}
                                >
                                    {value
                                        ? stateArr.find((state) => state.value === value)?.label
                                        : "Select state..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full md:max-w-[100%] p-0 max-h-[15rem] overflow-y-scroll">
                                <Command>
                                    <CommandInput placeholder="Search state..." />
                                    <CommandEmpty>No state found.</CommandEmpty>
                                    <CommandGroup>
                                        {stateArr.map((state) => (
                                            <CommandItem
                                                key={state.value}
                                                onSelect={(currentValue) => {
                                                    setValue(currentValue === value ? "" : currentValue)
                                                    setEventRegisterDetails({
                                                        ...eventRegisterDetails,
                                                        state: currentValue,

                                                    });
                                                    setInputValidity((prevState) => ({
                                                        ...prevState,
                                                        state: false,
                                                    }));
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
                        {inputValidity.state && (
                            <p className="text-red-500 text-sm mt-1">
                                State is required.
                            </p>
                        )}
                    </div>
                    <div className="">
                        <label htmlFor="password" className='text-sm text-white font-medium'>Password</label>
                        <Input type="password" className={`outline-none mt-1 border focus:border-none ${inputValidity.password ? "border-red-500" : ""}`} onChange={(e) => handleInputChange(e, "password")} />
                        {inputValidity.password && (
                            <p className="text-red-500 text-sm mt-1">
                                Password is required.
                            </p>
                        )}
                    </div>
                    <div className="">
                        <label htmlFor="confirmpassword" className='text-sm text-white font-medium'>Confirm Password</label>
                        <Input type="password" className={`outline-none mt-1 border focus:border-none ${inputValidity.confirmPassword ? "border-red-500" : ""}`} onChange={(e) => handleInputChange(e, "confirmPassword")} />
                        {inputValidity.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                Confirm Password is required.
                            </p>
                        )}
                    </div>
                </div>

                <Button type="submit" disabled={loading} className="mt-4 text-base w-full py-6 lg:text-lg">{loading ? 'Register' : 'Loading'}</Button>
            </form>
        </>
    )
}

export default Form