'use client';
import { EventStore } from '@/store/eventInfo';
import React, {
    ChangeEvent,
    ChangeEventHandler,
    FormEvent,
    useState,
} from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as Yup from 'yup';
import { toast } from 'sonner';
import { bookEventValidationSchema } from '@/validators/event';
import { bookEventCentre, checkEventAvailablity } from '@/utils/eventUtils';

const BookingForm = () => {
    const { eventDetails } = EventStore();
    const [bookingDetails, setBookingDetails] = useState({
        event_centre_id: eventDetails?.id,
        date: undefined,
        physical_user_name: '',
        physical_user_email: '',
        physical_user_phone: '',
        amount: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);

    const handleValueChange: ChangeEventHandler<HTMLInputElement> = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setBookingDetails({
            ...bookingDetails,
            [event.target.name]: event.target.value,
        });
    };

    const handleDateSelect = (date: any) => {
        setBookingDetails((prevDetails) => ({
            ...prevDetails,
            date: date,
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await bookEventValidationSchema.validate(bookingDetails, {
                abortEarly: false,
            });

            setErrors({});
            setLoading(true);
            const { status, message } = await checkEventAvailablity(
                bookingDetails.date!,
                bookingDetails.event_centre_id!
            );
            if (status !== 200) {
                toast.error('Unable to book event centre');
            }
            if (message === 'Date Available') {
                const { status, message } = await bookEventCentre({
                    event_centre_id: bookingDetails.event_centre_id,
                    date: bookingDetails.date,
                    physical_user_name: bookingDetails.physical_user_name,
                    physical_user_email: bookingDetails.physical_user_email,
                    physical_user_phone: bookingDetails.physical_user_phone,
                    amount: bookingDetails.amount,
                });
                if (status !== 200) {
                    toast.error('Unable to book event centre');
                }
                toast.success(message);
                setLoading(false);
            } else {
                toast.error(message);
                setLoading(false);
                return;
            }
            setLoading(false);
        } catch (validationErrors) {
            const errorsObj: { [key: string]: string } = {};
            if (validationErrors instanceof Yup.ValidationError) {
                validationErrors.inner.forEach((error: any) => {
                    errorsObj[error.path] = error.message;
                });
                setErrors(errorsObj);
            }
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-6">
                <div className="">
                    <label htmlFor="physical_user_name">Customer Name</label>
                    <Input
                        type="text"
                        name="physical_user_name"
                        value={bookingDetails.physical_user_name}
                        onChange={handleValueChange}
                    />
                    {errors.physical_user_name && (
                        <span className="text-red-500 text-xs">
                            {errors.physical_user_name}
                        </span>
                    )}
                </div>
                <div className="">
                    <label htmlFor="physical_user_email">Customer Email</label>
                    <Input
                        type="email"
                        name="physical_user_email"
                        value={bookingDetails.physical_user_email}
                        onChange={handleValueChange}
                    />
                    {errors.physical_user_email && (
                        <span className="text-red-500 text-xs">
                            {errors.physical_user_email}
                        </span>
                    )}
                </div>
                <div className="">
                    <label htmlFor="physical_user_phone">
                        Customer Phone Number
                    </label>
                    <Input
                        type="tel"
                        name="physical_user_phone"
                        value={bookingDetails.physical_user_phone}
                        onChange={handleValueChange}
                        maxLength={11}
                    />
                    {errors.physical_user_phone && (
                        <span className="text-red-500 text-xs">
                            {errors.physical_user_phone}
                        </span>
                    )}
                </div>
                <div className="">
                    <label htmlFor="amount">Amount</label>
                    <Input
                        type="text"
                        name="amount"
                        value={bookingDetails.amount}
                        onChange={handleValueChange}
                    />
                    {errors.amount && (
                        <span className="text-red-500 text-xs">
                            {errors.amount}
                        </span>
                    )}
                </div>
                <div className="">
                    <label htmlFor="date">Event Date</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={'outline'}
                                className={cn(
                                    'w-full justify-start text-left font-normal',
                                    !bookingDetails.date &&
                                        'text-muted-foreground'
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {bookingDetails.date ? (
                                    format(bookingDetails.date, 'yyyy-MM-dd')
                                ) : (
                                    <span>Pick event date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={bookingDetails.date}
                                onSelect={handleDateSelect}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    {errors.date && (
                        <span className="text-red-500 text-xs">
                            {errors.date}
                        </span>
                    )}
                </div>
            </div>
            <Button
                type="submit"
                disabled={loading}
                className="mt-8 bg-[#095A66] hover:bg-[#095A66] text-base py-6 lg:text-lg w-full"
            >
                {loading ? 'Checking Date Availability...' : 'Book Event'}
            </Button>
        </form>
    );
};

export default BookingForm;
