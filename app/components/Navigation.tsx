'use client'

import { UserStore } from "@/store/userInfo"
import { fetchUser } from "@/utils/userUtils"
import { useLayoutEffect } from "react"

const Navigation = () => {
    const { userDetails, setUserDetails } = UserStore()


    useLayoutEffect(() => {
        const fetchUserDetails = async () => {
            try {

                const { message, data, status } = await fetchUser()
                if (status !== 200) {
                    console.log(message);
                }
                setUserDetails(data)
            } catch (error) {
                console.log('Unable to fetch user details');
            }
        }
        fetchUserDetails()
    }, [])

    return (
        <>
            <nav className="flex my-6 justify-between items-center">
                <div className="">
                    <p>Quarvo</p>
                </div>
                <div className="">
                    <p>{`Hello, ${userDetails?.first_name}`}</p>
                </div>
            </nav>
        </>
    )
}

export default Navigation