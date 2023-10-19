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
import { registerEventCentres } from '@/utils/eventUtils';
import Spinner from '@/svgs/Spinner';
import Eye from '@/svgs/Eye';
import EyeOff from '@/svgs/EyeOff';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [loading, setLoading] = useState(false)
    const states: String[] = NaijaStates.states()
    const [seePassword, setSeePassword] = useState<boolean>(false);
    const [seeConfirmPassword, setSeeConfirmPassword] = useState<boolean>(false);

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

        if (eventRegisterDetails.password.trim() !== eventRegisterDetails.confirmPassword.trim()) {
            toast.error('Password and confirm password must be the same')
            return
        }

        try {
            setLoading(true)
            const { message, status } = await registerEventCentres(eventRegisterDetails)
            if (status !== 200) {
                toast.error(message)
                setLoading(false)
                return
            }
            toast.success(message)
            setLoading(false)
            router.replace('/event-center-login')

        } catch (error) {
            toast.error('Unable to process form submission')
            setLoading(false)
            return
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
                        <div className="flex">
                            <Input type={seePassword ? "text" : "password"} className={`outline-none mt-1 border focus:border-none ${inputValidity.password ? "border-red-500" : ""}`} onChange={(e) => handleInputChange(e, "password")} />

                            <div className="flex justify-end">
                                <span
                                    className="absolute mr-[1rem] mt-[.75rem] text-sm cursor-pointer"
                                    onClick={() => setSeePassword(!seePassword)}
                                >
                                    {seePassword ? <Eye /> : <EyeOff />}
                                </span>
                            </div>
                        </div>
                        {inputValidity.password && (
                            <p className="text-red-500 text-sm mt-1">
                                Password is required.
                            </p>
                        )}
                    </div>
                    <div className="">
                        <label htmlFor="confirmpassword" className='text-sm text-white font-medium'>Confirm Password</label>
                        <div className="flex">
                            <Input type={seeConfirmPassword ? "text" : "password"} className={`outline-none mt-1 border focus:border-none ${inputValidity.confirmPassword ? "border-red-500" : ""}`} onChange={(e) => handleInputChange(e, "confirmPassword")} />
                            <div className="flex justify-end">
                                <span
                                    className="absolute mr-[1rem] mt-[.75rem] text-sm cursor-pointer"
                                    onClick={() => setSeeConfirmPassword(!seeConfirmPassword)}
                                >
                                    {seeConfirmPassword ? <Eye /> : <EyeOff />}
                                </span>
                            </div>
                        </div>
                        {inputValidity.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                Confirm Password is required.
                            </p>
                        )}
                    </div>
                </div>

                <Button type="submit" disabled={loading} className="mt-4 text-base w-full py-6 lg:text-lg">{loading ? <Spinner className="mx-auto h-7 w-7 animate-spin" /> : 'Register'}</Button>
            </form>
            <div className="flex justify-center my-4 space-x-1 text-sm">
                <p>Already have an account?</p>
                <Link href={'/event-center-login'} className='underline'>Login </Link>
            </div>
        </>
    )
}

export default Form