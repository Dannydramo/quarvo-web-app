'use client'

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import { eventRegDetails } from '@/types/eventTypes'
import React, { useState } from 'react'
import { UserStore } from "@/store/userInfo"

const BookingForm: React.FC<{ eventCentre: eventRegDetails }> = ({ eventCentre, }) => {
    const { userDetails } = UserStore()
    const [date, setDate] = useState<Date>()
    const [loading, setLoading] = useState(false)

    const handleAvailabiltyCheck = async () => {
        try {
            if (!date) {
                console.error('Please select an event date.');
                return;
            }
            const formattedDate = date.toISOString();
            console.log(formattedDate, eventCentre.id, userDetails?.id)
            setLoading(true)

            const res = await fetch('/api/check-availability', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    eventCentreId: eventCentre.id,
                    date: formattedDate,
                    userId: userDetails?.id,
                }),
            });

            const data = await res.json()
            console.log(data);
            setLoading(false)

        } catch (error) {
            console.error('Error:', error);
            setLoading(false)
            return
        }
    };

    return (
        <section className="">
            <div className="">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full my-4 justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "yyyy-MM-dd") : <span>Pick event date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
                <Button onClick={handleAvailabiltyCheck} disabled={loading} className='w-full bg-[#856D47] text-white text-lg hover:bg-[#856D47] mb-8 md:mb-0'>{loading ? 'Checking Availability...' : 'Check Availability'}</Button>
            </div>
        </section>
    )
}

export default BookingForm;
