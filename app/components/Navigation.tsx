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
            <section className='mx-auto overflow-x-hidden w-[95%] sm:w-[90%]'>
                <nav className="flex my-6 justify-between items-center">
                    <div className="">
                        <p className="text-[#856D47] text-2xl font-bold">Quarvo</p>
                    </div>
                    <div className="">
                        <p>{`Hello, ${userDetails?.first_name}`}</p>
                    </div>
                </nav>
            </section>
        </>
    )
}

export default Navigation