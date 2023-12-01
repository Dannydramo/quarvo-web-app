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
import BookedModal from "./BookedModal"
import AvailableModal from "./AvailableModal"
import { checkEventAvailablity } from "@/utils/eventUtils"

const AvailabilityForm: React.FC<{ eventCentre: eventRegDetails, eventPrice: string }> = ({ eventCentre, eventPrice }) => {
    const { userDetails } = UserStore()
    const [date, setDate] = useState<Date>()
    const [loading, setLoading] = useState(false)
    const [availabilityMessage, setAvailabilityMessage] = useState()
    const [showModal, setShowModal] = useState(true);

    const handleAvailabiltyCheck = async () => {
        try {
            if (!date) {
                console.error('Please select an event date.');
                return;
            }
            const formattedDate = date.toISOString();
            setLoading(true)
            const { status, message } = await checkEventAvailablity(formattedDate, eventCentre.id)
            setAvailabilityMessage(message!)
            setLoading(false)

        } catch (error) {
            console.error('Error:', error);
            setLoading(false)
            return
        }
    };

    if (availabilityMessage === 'This date has already been booked.') {
        return <>
            {showModal && <BookedModal setShowModal={setShowModal} />}
        </>
    }

    if (availabilityMessage === 'Date Available') {
        return <>
            {showModal && <AvailableModal eventCentre={eventCentre} eventPrice={eventPrice} setShowModal={setShowModal} date={date?.toISOString()} />}
        </>

    }

    return (
        <section className="">
            {!showModal && <div className="">
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
            </div>}
        </section>
    )
}

export default AvailabilityForm;
