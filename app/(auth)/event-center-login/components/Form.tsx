'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { LoginDetails } from '@/types/onboarding'
import { loginEventCentre } from '@/utils/eventUtils'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Spinner from '@/svgs/Spinner'
import Eye from '@/svgs/Eye'
import EyeOff from '@/svgs/EyeOff'

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
            const { message, status } = await loginEventCentre(loginDetails)
            if (status !== 200) {
                toast.error(message)
                setLoading(false)
                return
            }
            toast.success(message)
            setLoading(false)
            router.replace('/dashboard')

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
                        <Input type="email" className={`outline-none mt-1 border focus:border-none ${inputValidity.email ? "border-red-500" : ""}`} onChange={(e) => handleInputChange(e, "email")} />
                        {inputValidity.email && (
                            <p className="text-red-500 text-sm mt-1">
                                Email Address is required.
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
                </div>
                <div className="mt-2">
                    <Link
                        href="/forgot-password"
                        className="underline float-right text-sm"
                    >
                        Forgot Password
                    </Link>
                </div>
                <Button type="submit" disabled={loading} className="mt-2 bg-[#856D47] hover:bg-[#856D47] text-base py-6 lg:text-lg w-full">{loading ? <Spinner className="mx-auto h-7 w-7 animate-spin" /> : 'Login'}</Button>
            </form>
            <div className="flex justify-center my-4 space-x-1 text-sm">
                <p>Don't have an account?</p>
                <Link href={'/event-center-signup'} className='underline'>Signup </Link>
            </div>
        </>
    )
}

export default Form