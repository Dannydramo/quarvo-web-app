'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { LoginDetails } from '@/types/onboarding'
import { useRouter } from 'next/navigation'
import EyeOff from '@/svgs/EyeOff'
import Eye from '@/svgs/Eye'
import Spinner from '@/svgs/Spinner'
import { loginUser } from '@/utils/userUtils'
import { toast } from 'sonner'

const Form = () => {
    const [loginDetails, setLoginDetails] = useState<LoginDetails>({
        email: '',
        password: ''
    })
    const [inputValidity, setInputValidity] = useState({
        password: false,
        email: false,

    });
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [seePassword, setSeePassword] = useState<boolean>(false);

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
            setLoading(true)
            const { message, status } = await loginUser(loginDetails)
            if (status !== 200) {
                toast.error(message)
                setLoading(false)
                return
            }
            toast.success(message)
            setLoading(false)
            router.replace('/')

        } catch (error) {
            toast.error('Unable to process form submission')
            setLoading(false)
            return
        }

    };
    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                <div className="grid gap-4">
                    <div className="">
                        <label htmlFor="email">Email</label>
                        <Input type="email" className={`outline-none mt-1 border ${inputValidity.email ? "border-red-500" : ""}`} onChange={(e) => handleInputChange(e, "email")} />
                        {inputValidity.email && (
                            <p className="text-red-500 text-sm mt-1">
                                Email Address is required.
                            </p>
                        )}
                    </div>
                    <div className="">
                        <label htmlFor="password">Password</label>
                        <div className="flex">
                            <Input type={seePassword ? "text" : "password"} className={`outline-none mt-1 border ${inputValidity.password ? "border-red-500" : ""}`} onChange={(e) => handleInputChange(e, "password")} />

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
                </div>

                <div className="mt-1">
                    <Link
                        href="/forgot-password"
                        className="underline float-right"
                    >
                        Forgot Password
                    </Link>
                </div>
                <Button type="submit" disabled={loading} className="mt-2 text-base bg-[#856D47] hover:bg-[#856D47] py-6 lg:text-lg w-full">{loading ? <Spinner className="mx-auto h-7 w-7 animate-spin" /> : 'Login'}</Button>
            </form>
            <div className="lg:flex justify-between">
                <div className="flex justify-center my-4 space-x-1 text-sm">
                    <p>Event Centre Account?</p>
                    <Link href={'/event-center-login'} className='underline'>Login </Link>
                </div>
                <div className="flex justify-center mb-4 lg:my-4 space-x-1 text-sm">
                    <p>Don't have an account?</p>
                    <Link href={'/signup'} className='underline'>Signup </Link>
                </div>
            </div>
        </>
    )
}

export default Form