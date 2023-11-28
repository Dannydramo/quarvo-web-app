'use client'
import { fetchUserBookingEventCentre } from "@/utils/eventUtils"
import { useEffect, useState } from "react"

const UserBooking = ({ userId }: { userId: string }) => {
    const [user, setUser] = useState()
    useEffect(() => {
        const fetchUser = async () => {
            try {

                const { data, message, status } = await fetchUserBookingEventCentre(userId)
                if (status !== 200) {
                    console.log(message);
                }
                setUser(data.full_name)
            } catch (error) {
                console.log('Unable to fetch user fullname');
            }
        }

        fetchUser()

    }, [])
    return (
        <p>{user}</p>
    )
}

export default UserBooking