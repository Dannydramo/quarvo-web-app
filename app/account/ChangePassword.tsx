'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import Spinner from '@/svgs/Spinner';
import Eye from '@/svgs/Eye';
import EyeOff from '@/svgs/EyeOff';
import { toast } from 'sonner';
import * as Yup from 'yup';
import { changePasswordValidationSchema } from '@/validators/account';
import { changeUserPasssword } from '@/services/account';
import { UserStore } from '@/store/userInfo';

const ChangePassword = () => {
    const { userDetails } = UserStore();
    const [passwordDetails, setPasswordDetails] = useState<{
        currentPassword: string;
        newPassword: string;
        confirmNewPassword: string;
    }>({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [seeCurrentPassword, setSeeCurrentPassword] =
        useState<boolean>(false);
    const [seeNewPassword, setSeeNewPassword] = useState<boolean>(false);
    const [seeConfirmNewPassword, setSeeConfirmNewPassword] =
        useState<boolean>(false);
    const router = useRouter();

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>,
        inputField: string
    ) => {
        const { value } = e.target;
        setPasswordDetails((prevState) => ({
            ...prevState,
            [inputField]: value,
        }));

        setErrors((prevState) => ({
            ...prevState,
            [inputField]: '',
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await changePasswordValidationSchema.validate(passwordDetails, {
                abortEarly: false,
            });

            setErrors({});

            setLoading(true);
            const { status, message } = await changeUserPasssword({
                ...passwordDetails,
                userId: userDetails?.id,
            });
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
                setErrors(errorsObj);
            } else {
                toast.error('Unable to process form submission');
                setLoading(false);
            }
        }
    };

    return (
        <>
            <div className="my-6 font-bold text-2xl md:text-3xl">
                <h1>Change your Password</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4 max-w-96 mb-8">
                    <div className="">
                        <label htmlFor="currentPassword">
                            Current Password
                        </label>
                        <div className="flex">
                            <Input
                                type={seeCurrentPassword ? 'text' : 'password'}
                                className={`outline-none mt-1 border ${
                                    errors.currentPassword
                                        ? 'border-red-500'
                                        : ''
                                }`}
                                onChange={(e) =>
                                    handleInputChange(e, 'currentPassword')
                                }
                            />
                            <div className="flex justify-end">
                                <span
                                    className="absolute mr-[1rem] mt-[.75rem] text-sm cursor-pointer"
                                    onClick={() =>
                                        setSeeCurrentPassword(
                                            !seeCurrentPassword
                                        )
                                    }
                                >
                                    {seeCurrentPassword ? <Eye /> : <EyeOff />}
                                </span>
                            </div>
                        </div>
                        {errors.currentPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.currentPassword}
                            </p>
                        )}
                    </div>
                    <div className="">
                        <label htmlFor="newPassword">New Password</label>
                        <div className="flex">
                            <Input
                                type={seeNewPassword ? 'text' : 'password'}
                                className={`outline-none mt-1 border ${
                                    errors.newPassword ? 'border-red-500' : ''
                                }`}
                                onChange={(e) =>
                                    handleInputChange(e, 'newPassword')
                                }
                            />
                            <div className="flex justify-end">
                                <span
                                    className="absolute mr-[1rem] mt-[.75rem] text-sm cursor-pointer"
                                    onClick={() =>
                                        setSeeNewPassword(!seeNewPassword)
                                    }
                                >
                                    {seeNewPassword ? <Eye /> : <EyeOff />}
                                </span>
                            </div>
                        </div>
                        {errors.newPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.newPassword}
                            </p>
                        )}
                    </div>
                    <div className="">
                        <label htmlFor="confirmNewPassword">
                            Confirm New Password
                        </label>
                        <div className="flex">
                            <Input
                                type={
                                    seeConfirmNewPassword ? 'text' : 'password'
                                }
                                className={`outline-none mt-1 border ${
                                    errors.confirmNewPassword
                                        ? 'border-red-500'
                                        : ''
                                }`}
                                onChange={(e) =>
                                    handleInputChange(e, 'confirmNewPassword')
                                }
                            />
                            <div className="flex justify-end">
                                <span
                                    className="absolute mr-[1rem] mt-[.75rem] text-sm cursor-pointer"
                                    onClick={() =>
                                        setSeeConfirmNewPassword(
                                            !seeConfirmNewPassword
                                        )
                                    }
                                >
                                    {seeConfirmNewPassword ? (
                                        <Eye />
                                    ) : (
                                        <EyeOff />
                                    )}
                                </span>
                            </div>
                        </div>
                        {errors.confirmNewPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmNewPassword}
                            </p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="mt-2 text-base bg-[#095A66] hover:bg-[#095A66] py-6 lg:text-lg w-full"
                    >
                        {loading ? (
                            <Spinner className="mx-auto h-7 w-7 animate-spin" />
                        ) : (
                            'Submit'
                        )}
                    </Button>
                </div>
            </form>
        </>
    );
};

export default ChangePassword;
