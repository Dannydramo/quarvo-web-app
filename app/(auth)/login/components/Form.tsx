'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { LoginDetails } from '@/types/onboarding';
import { useRouter } from 'next/navigation';
import EyeOff from '@/svgs/EyeOff';
import Eye from '@/svgs/Eye';
import Spinner from '@/svgs/Spinner';
import { loginUser } from '@/utils/userUtils';
import { toast } from 'sonner';
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
            const { message, status } = await loginUser(loginDetails);
            if (status !== 200) {
                toast.error(message);
                setLoading(false);
                return;
            }
            toast.success(message);
            setLoading(false);
            router.replace('/event-centres');

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
                        <label htmlFor="password">Password</label>
                        <div className="flex">
                            <Input
                                type={seePassword ? 'text' : 'password'}
                                className={`outline-none mt-1 border ${
                                    errors.password
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
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password}
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
                <Button
                    type="submit"
                    disabled={loading}
                    className="mt-2 text-base bg-[#095A66] hover:bg-[#095A66] py-6 lg:text-lg w-full"
                >
                    {loading ? (
                        <Spinner className="mx-auto h-7 w-7 animate-spin" />
                    ) : (
                        'Login'
                    )}
                </Button>
            </form>
            <div className="lg:flex justify-end">
                <div className="flex justify-center mb-4 lg:my-4 space-x-1 text-sm">
                    <p>Don't have an account?</p>
                    <Link href={'/signup'} className="underline">
                        Signup
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Form;
