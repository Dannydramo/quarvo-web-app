'use client'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import RevenueSvg from "@/svgs/RevenueSvg";
import { useState, useEffect } from "react";
import { BookingStore } from "@/store/bookingInfo";

const Revenue = () => {
    const { bookingDetails } = BookingStore();
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        const totalAmount = bookingDetails.reduce((accumulator, booking) => {
            return accumulator + parseFloat(booking.amount);
        }, 0);

        setAmount(totalAmount);
    }, [bookingDetails]);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <RevenueSvg />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">${amount.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground mt-2">
                    +20.1% from the last month
                </p>
            </CardContent>
        </Card>
    );
};

export default Revenue;
