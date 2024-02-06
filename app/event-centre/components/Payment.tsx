"use client";
import React, { useState } from "react";
import PaystackPop from "@paystack/inline-js";
import { UserStore } from "@/store/userInfo";
import { eventRegDetails } from "@/types/eventTypes";
import { bookEventCentre } from "@/utils/eventUtils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
interface PaystackTransaction {
    amount: number;
    reference: string;
}
const paystackKey = process.env.PAYSTACK_KEY;
const Payment: React.FC<{
    eventCentre: eventRegDetails;
    date: string | undefined;
    eventPrice: string;
}> = ({ eventCentre, date, eventPrice }) => {
    const { userDetails } = UserStore();
    const [loading, setLoading] = useState(false);
    const handleEventBooking = async () => {
        try {
            setLoading(true);
            const formattedDate = date;
            const { status, message } = await bookEventCentre(
                eventCentre.id,
                formattedDate,
                userDetails?.id,
                eventPrice
            );
            toast.success(message);
            setLoading(false);
        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
            return;
        }
    };
    const handlePayment = () => {
        const paystack = new PaystackPop();
        paystack.newTransaction({
            key: `${paystackKey}`,
            amount: +eventPrice * 100,
            email: `${userDetails?.email}`,
            firstname: `${userDetails?.first_name}`,
            lastname: `${userDetails?.last_name}`,
            onSuccess(transaction: PaystackTransaction) {
                handleEventBooking();
            },
            onCancel() {
                toast.error(
                    "Payment was not Successful. Please Try Again Later"
                );
            },
        });
    };

    return (
        <Button
            className="bg-[#856D47] mt-4 hover:bg-[#856D47] mb-8 text-white"
            disabled={loading}
            onClick={handlePayment}
        >
            {loading ? "Confirming Booking" : "Continue with payment"}
        </Button>
    );
};

export default Payment;
