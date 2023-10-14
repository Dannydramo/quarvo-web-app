'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { LoginDetails } from '@/types/onboarding'

const Form = () => {
    const [loginDetails, setLoginDetails] = useState<LoginDetails>({
        email: '',
        password: ''
    })
    const [inputValidity, setInputValidity] = useState({
        password: false,
        email: false,

    });

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>,
        inputField: string
    ) => {
        const { value } = e.target;
        setLoginDetails((prevState) => ({
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
        for (const key in loginDetails) {
            if (!loginDetails[key as keyof LoginDetails]) {
                // If the field is empty, set its validity to true
                setInputValidity((prevState) => ({
                    ...prevState,
                    [key]: true,
                }));
            }
        }


        try {
            const res = await fetch('/api/user-login', {
                method: "POST",
                body: JSON.stringify(loginDetails)
            })
            if (res.status === 200) {
                const data = await res.json()
                console.log(data);
            }


        } catch (error) {
            console.log(error);

        }

    };
    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                <div className="grid gap-4">
                    <div className="">
                        <label htmlFor="email">Email</label>
                        <Input type="email" className="outline-none mt-2 border-none focus:border-none" />
                    </div>
                    <div className="">
                        <label htmlFor="password">Password</label>
                        <Input type="password" className="outline-none mt-2 border-none focus:border-none" />
                    </div>
                </div>
                <div className="mt-1">
                    <Link
                        href="/forgot-password"
                        className="underline float-right"
                    >
                        Forgot Password
                    </Link>
                </div>
                <Button type="submit" className="mt-2 text-base py-6 lg:text-lg w-full">Login</Button>
            </form>
        </>
    )
}

export default Form