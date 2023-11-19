"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
    {
        name: "Jan",
        Totalclient: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Feb",
        Totalclient: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Mar",
        Totalclient: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Apr",
        Totalclient: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "May",
        Totalclient: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Jun",
        Totalclient: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Jul",
        Totalclient: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Aug",
        Totalclient: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Sep",
        Totalclient: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Oct",
        Totalclient: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Nov",
        Totalclient: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Dec",
        Totalclient: Math.floor(Math.random() * 5000) + 1000,
    },
]

const Overview = () => {
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
    )
}

export default Overview