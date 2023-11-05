import React from 'react'
import Navigation from '../components/Navigation'
import Form from './component/Form'
import EventProfile from './component/EventProfile'


const Profile = () => {
    return (
        <>
            <Navigation>
                <section className="w-[95%] mx-auto">
                    <EventProfile />
                </section>
            </Navigation>
        </>
    )
}

export default Profile