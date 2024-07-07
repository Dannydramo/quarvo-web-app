'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { LoginDetails } from '@/types/onboarding';
import { loginEventCentre } from '@/utils/eventUtils';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Spinner from '@/svgs/Spinner';
import Eye from '@/svgs/Eye';
import EyeOff from '@/svgs/EyeOff';
import * as Yup from 'yup';
import { loginValidationSchema } from '@/validators/onboarding';

const Form = () => {
    const [loginDetails, setLoginDetails] = useState<LoginDetails>({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();
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

        // Reset error when input value changes
        setErrors((prevState) => ({
            ...prevState,
            [inputField]: '',
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await loginValidationSchema.validate(loginDetails, {
                abortEarly: false,
            });

            setErrors({});

            setLoading(true);
            const { message, status } = await loginEventCentre(loginDetails);
            if (status !== 200) {
                toast.error(message);
                setLoading(false);
                return;
            }
            router.replace('/dashboard');
            toast.success(message);
            setLoading(false);
        } catch (validationErrors) {
            const errorsObj: { [key: string]: string } = {};
            if (validationErrors instanceof Yup.ValidationError) {
                validationErrors.inner.forEach((error: any) => {
                    errorsObj[error.path] = error.message;
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
            <form action="" onSubmit={handleSubmit}>
                <div className="grid gap-4">
                    <div className="">
                        <label htmlFor="email">Email</label>
                        <Input
                            type="email"
                            className={`outline-none mt-1 ${
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
                        <label htmlFor="password">Password</label>
                        <div className="flex">
                            <Input
                                type={seePassword ? 'text' : 'password'}
                                className={`outline-none mt-1 ${
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
                </div>
                <div className="mt-2">
                    <Link
                        href="/forgot-password"
                        className="underline float-right text-sm"
                    >
                        Forgot Password
                    </Link>
                </div>
                <Button
                    type="submit"
                    disabled={loading}
                    className="mt-2 bg-[#095A66] hover:bg-[#095A66] text-base py-6 lg:text-lg w-full"
                >
                    {loading ? (
                        <Spinner className="mx-auto h-7 w-7 animate-spin" />
                    ) : (
                        'Login'
                    )}
                </Button>
            </form>
            <div className="flex justify-center my-4 space-x-1 text-sm">
                <p>Don't have an account?</p>
                <Link href={'/event-center-signup'} className="underline">
                    Signup{' '}
                </Link>
            </div>
        </>
    );
};

export default Form;
