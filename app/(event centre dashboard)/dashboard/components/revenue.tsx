'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import RevenueSvg from "@/svgs/RevenueSvg";
import { useState, useEffect } from "react";
import { BookingStore } from "@/store/bookingInfo";

const Revenue = () => {
    const { bookingDetails } = BookingStore();
    const [amount, setAmount] = useState(0);
    const [percentageChange, setPercentageChange] = useState(0);

    useEffect(() => {
        const totalAmount = bookingDetails.reduce((accumulator, booking) => {
            return accumulator + parseFloat(booking.amount);
        }, 0);

        setAmount(totalAmount);
    }, [bookingDetails]);

    useEffect(() => {
        // Calculate total revenue from the previous month
        const currentDate = new Date();
        const lastMonth = new Date(currentDate);
        lastMonth.setMonth(currentDate.getMonth() - 1);

        const totalAmountLastMonth = bookingDetails.reduce((accumulator, booking) => {
            const bookingDate = new Date(booking.created_at);
            if (bookingDate >= lastMonth && bookingDate < currentDate) {
                return accumulator + +booking.amount;
            }
            return accumulator;
        }, 0);

        // Calculate percentage change
        const percentage = ((amount - totalAmountLastMonth) / totalAmountLastMonth) * 100;
        setPercentageChange(percentage);
    }, [amount, bookingDetails]);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <RevenueSvg />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">NGN{amount.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground mt-2">
                    {percentageChange > 0 ? '+' : ''}{percentageChange.toFixed(1)}% from the last month
                </p>
            </CardContent>
        </Card>
    );
};

export default Revenue;