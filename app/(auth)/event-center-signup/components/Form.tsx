'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
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

const Form = () => {
    const [eventRegisterDetails, setEventRegisterDetails] = useState<EventCentreReg>({
        eventCentreName: '',
        email: '',
        password: '',
        phoneNumber: '',
        state: '',
        confirmPassword: ''
    })
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    // const [states, setStates] = useState<String[]>(NaijaStates.states())
    const states: String[] = NaijaStates.states()

    return (
        <>
            <form action="">
                <div className="grid gap-4">
                    <div className="">
                        <label htmlFor="eventname">Event Centre Name</label>
                        <Input type="text" className="outline-none mt-2 border-none focus:border-none" />
                    </div>
                    <div className="">
                        <label htmlFor="phone">Phone Number</label>
                        <Input type="tel" className="outline-none mt-2 border-none focus:border-none" />
                    </div>
                    <div className="">
                        <label htmlFor="email">Email</label>
                        <Input type="email" className="outline-none mt-2 border-none focus:border-none" />
                    </div>
                    <div className=''>
                        <label htmlFor="state">Select State</label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className={`w-full h-12 flex justify-between mt-2`}
                                >
                                    {value
                                        ? states.find((state) => state === value)
                                        : "Select State"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full md:max-w-[100%] p-0 max-h-[15rem] overflow-y-scroll">
                                <Command>
                                    <CommandInput placeholder="Search State" />
                                    <CommandEmpty>No State found.</CommandEmpty>
                                    <CommandGroup>
                                        {states.map((state, index) => (
                                            <CommandItem
                                                key={index}
                                                onSelect={(currentValue: string) => {
                                                    setValue(currentValue === value ? "" : currentValue);
                                                    console.log(currentValue);

                                                    setEventRegisterDetails({
                                                        ...eventRegisterDetails,
                                                        state: currentValue,

                                                    });
                                                    setOpen(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        value === state ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {state}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="">
                        <label htmlFor="password">Password</label>
                        <Input type="password" className="outline-none mt-2 border-none focus:border-none" />
                    </div>
                </div>

                <Button type="submit" className="mt-4 text-base w-full py-6 lg:text-lg">Register</Button>
            </form>
        </>
    )
}

export default Form