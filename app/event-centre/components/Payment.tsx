'use client'
import React from 'react'
import PaystackPop from "@paystack/inline-js";
import { UserStore } from '@/store/userInfo';
import { eventRegDetails } from '@/types/eventTypes';
import { bookEventCentre } from '@/utils/eventUtils';
import { toast } from 'sonner'
import { Button } from '@/components/ui/button';
const Payment: React.FC<{ eventCentre: eventRegDetails, date: string | undefined, eventPrice: string }> = ({ eventCentre, date, eventPrice }) => {
    const { userDetails } = UserStore()
    const handleEventBooking = async () => {
        try {
            const formattedDate = date;
            const { status, message } = await bookEventCentre(eventCentre.id, formattedDate, userDetails?.id,eventPrice)
            toast.success(message)
        } catch (error) {
            console.error('Error:', error);

            return
        }
    };
    const handlePayment = () => {
        const paystack = new PaystackPop();
        paystack.newTransaction({
            key: process.env.PAYSTACK_TEST_PUBLIC_KEY,
            amount: +eventPrice,
            email: `${userDetails?.email}`,
            firstname: `${userDetails?.first_name}`,
            lastname: `${userDetails?.last_name}`,
            onSuccess(transaction: any) {
                console.log(transaction)
                handleEventBooking()
            },
            onCancel() {
                toast.error("Payment was not Successful. Please Try Again Later");
            },
        });
    };

    return (
        <Button className='bg-[#856D47] hover:bg-[#856D47] mb-8 text-white' onClick={handlePayment} >Continue with payment</Button>
    )
}

export default Payment