'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Eye from '@/svgs/Eye';
import EyeOff from '@/svgs/EyeOff';
import Spinner from '@/svgs/Spinner';
import { UserReg } from '@/types/onboarding';
import { registerUser } from '@/utils/userUtils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'sonner';
import * as Yup from 'yup';
import { userRegistrationValidationSchema } from '@/validators/onboarding';

const Form = () => {
    const [userRegDetails, setUserRegDetails] = useState<UserReg>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    });
    const [inputValidity, setInputValidity] = useState({
        firstName: false,
        lastName: false,
        phoneNumber: false,
        password: false,
        email: false,
        confirmPassword: false,
    });
    const [loading, setLoading] = useState(false);
    const [seePassword, setSeePassword] = useState<boolean>(false);
    const [seeConfirmPassword, setSeeConfirmPassword] =
        useState<boolean>(false);
    const router = useRouter();

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>,
        inputField: string
    ) => {
        const { value } = e.target;
        setUserRegDetails((prevState) => ({
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

        try {
            await userRegistrationValidationSchema.validate(userRegDetails, {
                abortEarly: false,
            });

            setLoading(true);
            const { message, status } = await registerUser(userRegDetails);
            if (status !== 200) {
                toast.error(message);
                setLoading(false);
                return;
            }
            toast.success(message);
            setLoading(false);
            router.replace('/login');
        } catch (validationErrors) {
            const errorsObj: { [key: string]: string } = {};
            if (validationErrors instanceof Yup.ValidationError) {
                validationErrors.inner.forEach((error) => {
                    errorsObj[error.path!] = error.message;
                });
                // setInputValidity(errorsObj);
            } else {
                toast.error('Unable to process form submission');
                setLoading(false);
            }
        }
    };

    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                <div className="grid gap-4">
                    <div className="">
                        <label htmlFor="firstname">First Name</label>
                        <Input
                            type="text"
                            className={`outline-none mt-1 border ${
                                inputValidity.firstName ? 'border-red-500' : ''
                            }`}
                            onChange={(e) => handleInputChange(e, 'firstName')}
                        />
                        {inputValidity.firstName && (
                            <p className="text-red-500 text-sm mt-1">
                                {inputValidity.firstName}
                            </p>
                        )}
                    </div>
                    <div className="">
                        <label htmlFor="lastname">Last Name</label>
                        <Input
                            type="text"
                            className={`outline-none mt-1 border ${
                                inputValidity.lastName ? 'border-red-500' : ''
                            }`}
                            onChange={(e) => handleInputChange(e, 'lastName')}
                        />
                        {inputValidity.lastName && (
                            <p className="text-red-500 text-sm mt-1">
                                {inputValidity.lastName}
                            </p>
                        )}
                    </div>

                    <div className="">
                        <label htmlFor="email">Email</label>
                        <Input
                            type="email"
                            className={`outline-none mt-1 border ${
                                inputValidity.email ? 'border-red-500' : ''
                            }`}
                            onChange={(e) => handleInputChange(e, 'email')}
                        />
                        {inputValidity.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {inputValidity.email}
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
                                inputValidity.phoneNumber
                                    ? 'border-red-500'
                                    : ''
                            }`}
                            onChange={(e) =>
                                handleInputChange(e, 'phoneNumber')
                            }
                        />
                        {inputValidity.phoneNumber && (
                            <p className="text-red-500 text-sm mt-1">
                                {inputValidity.phoneNumber}
                            </p>
                        )}
                    </div>
                    <div className="">
                        <label htmlFor="password">Password</label>
                        <div className="flex">
                            <Input
                                type={seePassword ? 'text' : 'password'}
                                className={`outline-none mt-1 borde ${
                                    inputValidity.password
                                        ? 'border-red-500'
                                        : ''
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
                        {inputValidity.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {inputValidity.password}
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
                                    inputValidity.confirmPassword
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
                        {inputValidity.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {inputValidity.confirmPassword}
                            </p>
                        )}
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className="mt-4 text-base bg-[#095A66] hover:bg-[#095A66] w-full py-6 lg:text-lg"
                >
                    {loading ? (
                        <Spinner className="mx-auto h-6 w-6 animate-spin" />
                    ) : (
                        'Register'
                    )}
                </Button>
            </form>
            <div className="flex justify-center my-4 space-x-1 text-sm">
                <p>Already have an account?</p>
                <Link href={'/login'} className="underline">
                    Login{' '}
                </Link>
            </div>
        </>
    );
};

export default Form;
