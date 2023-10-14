'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserReg } from '@/types/onboarding'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

const Form = () => {
    const [userRegDetails, setUserRegDetails] = useState<UserReg>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    })
    const [inputValidity, setInputValidity] = useState({
        firstName: false,
        lastName: false,
        phoneNumber: false,
        password: false,
        email: false,
        confirmPassword: false,
    });

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

        // Check if all fields are filled
        for (const key in userRegDetails) {
            if (!userRegDetails[key as keyof UserReg]) {
                // If the field is empty, set its validity to true
                setInputValidity((prevState) => ({
                    ...prevState,
                    [key]: true,
                }));
            }
        }


        try {
            const res = await fetch('/api/user-signup', {
                method: "POST",
                body: JSON.stringify(userRegDetails)
            })
            // if (res.status === 200) {
            //     const data = await res.json()
            //     console.log(data);
            //     toast.success(data.message)
            // }
            // if (res.status !== 200) {
            //     console.log(res);

            // }
            const data = await res.json()
            console.log(data);

            if (data.status !== 200) {
                toast.error(data.message)
            }
            toast.success(data.message)

        } catch (error: any) {
            console.log(error.message);
            toast.error("Unable to process form submission")
        }

    };


    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                <div className="grid gap-4">
                    <div className="">
                        <label htmlFor="firstname" className='text-sm text-white font-medium'>First Name</label>
                        <Input type="text" className={`outline-none mt-1 border focus:border-none ${inputValidity.firstName ? "border-red-500" : ""}`} onChange={(e) => handleInputChange(e, "firstName")} />
                        {inputValidity.firstName && (
                            <p className="text-red-500 text-sm mt-1">
                                First Name is required.
                            </p>
                        )}
                    </div>
                    <div className="">
                        <label htmlFor="lastname" className='text-sm text-white font-medium'>Last Name</label>
                        <Input type="text" className={`outline-none mt-1 border focus:border-none ${inputValidity.lastName ? "border-red-500" : ""}`} onChange={(e) => handleInputChange(e, "lastName")} />
                        {inputValidity.lastName && (
                            <p className="text-red-500 text-sm mt-1">
                                Last Name is required.
                            </p>
                        )}
                    </div>

                    <div className="">
                        <label htmlFor="email" className='text-sm text-white font-medium'>Email</label>
                        <Input type="email" className={`outline-none mt-1 border focus:border-none ${inputValidity.email ? "border-red-500" : ""}`} onChange={(e) => handleInputChange(e, "email")} />
                        {inputValidity.email && (
                            <p className="text-red-500 text-sm mt-1">
                                Email Address is required.
                            </p>
                        )}
                    </div>
                    <div className="">
                        <label htmlFor="phone" className='text-sm text-white font-medium'>Phone Number</label>
                        <Input type="tel" maxLength={11} minLength={11} className={`outline-none mt-1 border focus:border-none ${inputValidity.phoneNumber ? "border-red-500" : ""}`} onChange={(e) => handleInputChange(e, "phoneNumber")} />
                        {inputValidity.phoneNumber && (
                            <p className="text-red-500 text-sm mt-1">
                                Phone Number is required.
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

                <Button type="submit" className="mt-4 text-base w-full py-4 lg:text-lg">Register</Button>
            </form>
            <button onClick={() => toast('My first toast')}>
                Give me a toast
            </button>
        </>
    )
}

export default Form