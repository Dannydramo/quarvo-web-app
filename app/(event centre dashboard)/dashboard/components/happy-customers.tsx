'use client'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { BookingStore } from "@/store/bookingInfo"
import Customers from "@/svgs/Customers"
import { fetchEventBookings } from "@/utils/eventUtils"
import { useEffect, useState } from "react"
const HappyCustomers = () => {
    const [happyCustomers, setHappyCustomers] = useState(0)
    const { bookingDetails } = BookingStore()
    useEffect(() => {
        setHappyCustomers(bookingDetails?.length)
    }, [])

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
                    <div className="text-2xl font-bold">{`+${happyCustomers}`}</div>
                    <p className="text-xs text-muted-foreground mt-2">
                        +180.1% from last month
                    </p>
                </CardContent>
            </Card>
        </>
    )
}

export default HappyCustomers;