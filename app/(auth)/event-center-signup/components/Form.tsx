'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { ChangeEvent, FormEvent, useState } from 'react';
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
import NaijaStates from 'naija-state-local-government';
import { EventCentreReg } from '@/types/onboarding';
import { toast } from 'sonner';
import { registerEventCentres } from '@/utils/eventUtils';
import Spinner from '@/svgs/Spinner';
import Eye from '@/svgs/Eye';
import EyeOff from '@/svgs/EyeOff';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { eventRegistrationValidationSchema } from '@/validators/onboarding';

const Form = () => {
    const [eventRegisterDetails, setEventRegisterDetails] =
        useState<EventCentreReg>({
            eventCentreName: '',
            email: '',
            password: '',
            phoneNumber: '',
            state: '',
            confirmPassword: '',
        });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const states: String[] = NaijaStates.states();
    const [seePassword, setSeePassword] = useState<boolean>(false);
    const [seeConfirmPassword, setSeeConfirmPassword] =
        useState<boolean>(false);

    const stateArr = states.map((state) => {
        return {
            value: state.toLocaleLowerCase(),
            label: state,
        };
    });

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>,
        inputField: string
    ) => {
        const { value } = e.target;
        setEventRegisterDetails((prevState) => ({
            ...prevState,
            [inputField]: value,
        }));

        // Reset error when input value changes
        setErrors((prevState) => ({
            ...prevState,
            [inputField]: '',
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await eventRegistrationValidationSchema.validate(
                eventRegisterDetails,
                {
                    abortEarly: false,
                }
            );

            setErrors({});

            setLoading(true);
            const { message, status } = await registerEventCentres(
                eventRegisterDetails
            );
            if (status !== 200) {
                toast.error(message);
                setLoading(false);
                return;
            }
            toast.success(message);
            setLoading(false);
            router.replace('/event-center-login');
        } catch (validationErrors) {
            const errorsObj: { [key: string]: string } = {};
            if (validationErrors instanceof Yup.ValidationError) {
                validationErrors.inner.forEach((error) => {
                    errorsObj[error.path!] = error.message;
                });
                setErrors(errorsObj);
            } else {
                toast.error('Unable to process form submission');
                setLoading(false);
            }
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                    <div className="">
                        <label htmlFor="eventname">Event Centre Name</label>
                        <Input
                            type="text"
                            className={`outline-none mt-1 border ${
                                errors.eventCentreName ? 'border-red-500' : ''
                            }`}
                            onChange={(e) =>
                                handleInputChange(e, 'eventCentreName')
                            }
                        />
                        {errors.eventCentreName && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.eventCentreName}
                            </p>
                        )}
                    </div>
                    <div className="">
                        <label htmlFor="phone">Phone Number</label>
                        <Input
                            type="tel"
                            maxLength={11}
                            minLength={11}
                            className={`outline-none mt-1 border ${
                                errors.phoneNumber ? 'border-red-500' : ''
                            }`}
                            onChange={(e) =>
                                handleInputChange(e, 'phoneNumber')
                            }
                        />
                        {errors.phoneNumber && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.phoneNumber}
                            </p>
                        )}
                    </div>
                    <div className="">
                        <label htmlFor="email">Email</label>
                        <Input
                            type="email"
                            className={`outline-none mt-1 border ${
                                errors.email ? 'border-red-500' : ''
                            }`}
                            onChange={(e) => handleInputChange(e, 'email')}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>
                    <div className="">
                        <label htmlFor="state">Select State</label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className={`w-full h-10 flex justify-between mt-1 ${
                                        errors.state ? 'border-red-500' : ''
                                    }`}
                                >
                                    {value
                                        ? stateArr.find(
                                              (state) => state.value === value
                                          )?.label
                                        : 'Select state...'}
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
                                                    setValue(
                                                        currentValue === value
                                                            ? ''
                                                            : currentValue
                                                    );
                                                    setEventRegisterDetails({
                                                        ...eventRegisterDetails,
                                                        state: currentValue,
                                                    });
                                                    setErrors((prevState) => ({
                                                        ...prevState,
                                                        state: '',
                                                    }));
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
                        {errors.state && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.state}
                            </p>
                        )}
                    </div>
                    <div className="">
                        <label htmlFor="password">Password</label>
                        <div className="flex">
                            <Input
                                type={seePassword ? 'text' : 'password'}
                                className={`outline-none mt-1 border ${
                                    errors.password ? 'border-red-500' : ''
                                }`}
                                onChange={(e) =>
                                    handleInputChange(e, 'password')
                                }
                            />
                            <div className="flex justify-end">
                                <span
                                    className="absolute mr-[1rem] mt-[.75rem] text-sm cursor-pointer"
                                    onClick={() => setSeePassword(!seePassword)}
                                >
                                    {seePassword ? <Eye /> : <EyeOff />}
                                </span>
                            </div>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>
                    <div className="">
                        <label htmlFor="confirmpassword">
                            Confirm Password
                        </label>
                        <div className="flex">
                            <Input
                                type={seeConfirmPassword ? 'text' : 'password'}
                                className={`outline-none mt-1 border ${
                                    errors.confirmPassword
                                        ? 'border-red-500'
                                        : ''
                                }`}
                                onChange={(e) =>
                                    handleInputChange(e, 'confirmPassword')
                                }
                            />
                            <div className="flex justify-end">
                                <span
                                    className="absolute mr-[1rem] mt-[.75rem] text-sm cursor-pointer"
                                    onClick={() =>
                                        setSeeConfirmPassword(
                                            !seeConfirmPassword
                                        )
                                    }
                                >
                                    {seeConfirmPassword ? <Eye /> : <EyeOff />}
                                </span>
                            </div>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className="mt-4 bg-[#095A66] hover:bg-[#095A66] text-base w-full py-6 lg:text-lg"
                >
                    {loading ? (
                        <Spinner className="mx-auto h-7 w-7 animate-spin" />
                    ) : (
                        'Register'
                    )}
                </Button>
            </form>
            <div className="flex justify-center my-4 space-x-1 text-sm">
                <p>Already have an account?</p>
                <Link href={'/event-center-login'} className="underline">
                    Login{' '}
                </Link>
            </div>
        </>
    );
};

export default Form;
