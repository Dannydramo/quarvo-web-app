'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { LoginDetails } from '@/types/onboarding'

const Form = () => {
    const [loginDetails, setLoginDetails] = useState<LoginDetails>({
        email: '',
        password: ''
    })
    return (
        <>
            <form action="">
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