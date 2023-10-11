'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React, { useState } from 'react'

const Form = () => {
    const [loginDetails, setLoginDetails] = useState({
        email: '',
    })
    return (
        <>
            <form action="">
                <div className="grid gap-4">
                    <div className="">
                        <label htmlFor="email">Email</label>
                        <Input type="email" className="outline-none mt-2 border-none focus:border-none" />
                    </div>
                </div>
                <div className="mt-1">
                    <Link
                        href="/login"
                        className="underline float-right"
                    >
                        Already have an account?
                    </Link>
                </div>
                <Button type="submit" className="mt-2 text-base py-6 lg:text-lg w-full">Login</Button>
            </form>
        </>
    )
}

export default Form