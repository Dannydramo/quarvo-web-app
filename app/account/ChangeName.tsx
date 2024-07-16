'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import Spinner from '@/svgs/Spinner';
import { toast } from 'sonner';
import * as Yup from 'yup';
import { changeNameValidationSchema } from '@/validators/account';
import { UserStore } from '@/store/userInfo';
import { editUserInfo } from '@/services/account';

const ChangeName = () => {
    const { userDetails } = UserStore();

    const [nameDetails, setNameDetails] = useState<{
        firstName: string;
        lastName: string;
        phoneNumber: string;
    }>({
        firstName: '',
        lastName: '',
        phoneNumber: '',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if (userDetails) {
            setNameDetails({
                firstName: userDetails.first_name,
                lastName: userDetails.last_name,
                phoneNumber: userDetails.phone_number,
            });
        }
    }, [userDetails]);

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>,
        inputField: string
    ) => {
        const { value } = e.target;
        setNameDetails((prevState) => ({
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
            await changeNameValidationSchema.validate(nameDetails, {
                abortEarly: false,
            });

            setErrors({});
            setLoading(true);
            const { status, message } = await editUserInfo({
                userId: userDetails?.id,
                ...nameDetails,
            });
            if (status !== 200) {
                toast.error(message);
                setLoading(false);
                return;
            }
            toast.success(message);
            setLoading(false);
            router.refresh();
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
                <h1>Change your Username</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4 max-w-96">
                    <div className="">
                        <label htmlFor="firstName">First Name</label>
                        <Input
                            type="text"
                            className={`outline-none mt-1 border ${
                                errors.firstName ? 'border-red-500' : ''
                            }`}
                            value={nameDetails.firstName}
                            onChange={(e) => handleInputChange(e, 'firstName')}
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.firstName}
                            </p>
                        )}
                    </div>
                    <div className="">
                        <label htmlFor="lastName">Last Name</label>
                        <Input
                            type="text"
                            value={nameDetails.lastName}
                            className={`outline-none mt-1 border ${
                                errors.lastName ? 'border-red-500' : ''
                            }`}
                            onChange={(e) => handleInputChange(e, 'lastName')}
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.lastName}
                            </p>
                        )}
                    </div>
                    <div className="">
                        <label htmlFor="firstName">Phone Number</label>
                        <Input
                            type="tel"
                            className={`outline-none mt-1 border ${
                                errors.firstName ? 'border-red-500' : ''
                            }`}
                            value={nameDetails.phoneNumber}
                            onChange={(e) =>
                                handleInputChange(e, 'phoneNumber')
                            }
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.phoneNumber}
                            </p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="mt-2 text-base bg-[#095A66] hover:bg-[#095A66] py-6 lg:text-lg"
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

export default ChangeName;
