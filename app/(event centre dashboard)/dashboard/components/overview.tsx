"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import { BookingStore } from "@/store/bookingInfo";

const Overview = () => {
    const { bookingDetails } = BookingStore();
    const [monthlyData, setMonthlyData] = useState<number[]>([]);

    useEffect(() => {

        const initialMonthlyData = Array.from({ length: 12 }, () => 0);

        bookingDetails.forEach((booking) => {
            const monthIndex = new Date(booking.date).getMonth();
            initialMonthlyData[monthIndex] += parseFloat(booking.amount);
        });

        setMonthlyData(initialMonthlyData);
    }, [bookingDetails]);

    const data = [
        { name: "Jan", Totalclient: monthlyData[0] },
        { name: "Feb", Totalclient: monthlyData[1] },
        { name: "Mar", Totalclient: monthlyData[2] },
        { name: "Apr", Totalclient: monthlyData[3] },
        { name: "May", Totalclient: monthlyData[4] },
        { name: "Jun", Totalclient: monthlyData[5] },
        { name: "Jul", Totalclient: monthlyData[6] },
        { name: "Aug", Totalclient: monthlyData[7] },
        { name: "Sep", Totalclient: monthlyData[8] },
        { name: "Oct", Totalclient: monthlyData[9] },
        { name: "Nov", Totalclient: monthlyData[10] },
        { name: "Dec", Totalclient: monthlyData[11] },
    ];

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                />
                <Bar dataKey="Totalclient" fill="#856D47" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default Overview;
