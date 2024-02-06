"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingStore } from "@/store/bookingInfo";
import Customers from "@/svgs/Customers";

const HappyCustomers = () => {
    const { bookingDetails } = BookingStore();

    const currentMonthHappyCustomers = bookingDetails?.length || 0;

    const lastMonthDate = new Date();
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

    const lastMonthBookings = bookingDetails.filter((booking) => {
        const bookingDate = new Date(booking.created_at);
        return bookingDate >= lastMonthDate;
    });
    const lastMonthHappyCustomers = lastMonthBookings.length;

    const percentageChange = lastMonthHappyCustomers
        ? ((currentMonthHappyCustomers - lastMonthHappyCustomers) /
              lastMonthHappyCustomers) *
          100
        : 0;

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Happy Customers
                    </CardTitle>
                    <Customers />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{`+${currentMonthHappyCustomers}`}</div>
                    <p className="text-xs text-muted-foreground mt-2">
                        {percentageChange.toFixed(1)}% from last month
                    </p>
                </CardContent>
            </Card>
        </>
    );
};

export default HappyCustomers;
