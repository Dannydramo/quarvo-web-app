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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  
const AvailabilityForm: React.FC<{ eventCentre: eventRegDetails, eventPrice: string }> = ({ eventCentre, eventPrice }) => {
    const { userDetails } = UserStore()
    const [date, setDate] = useState<Date>()
    const [loading, setLoading] = useState(false)
    const [availabilityMessage, setAvailabilityMessage] = useState()
    const [showModal, setShowModal] = useState(false);

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
            setShowModal(true)
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
                <Button onClick={handleAvailabiltyCheck} disabled={loading} className='w-full bg-[#095A66] text-white hover:bg-[#095A66] mb-8 md:mb-0'>{loading ? 'Checking Availability...' : 'Check Availability'}</Button>
            </div>

            {showModal && availabilityMessage === 'This date has already been booked.' && <BookedModal setShowModal={setShowModal} />}
            {showModal && availabilityMessage === 'Date Available' && <AvailableModal eventCentre={eventCentre} eventPrice={eventPrice} setShowModal={setShowModal} date={date?.toISOString()} />}
        </section>
    )
}

export default AvailabilityForm;
