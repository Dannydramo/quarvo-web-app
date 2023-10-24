import React from 'react'
import Navigation from '../components/Navigation'
import Form from './component/Form'


const Profile = () => {
    return (
        <>
            <Navigation>
                <section className="w-[95%] mx-auto">
                    <p>Profile</p>
                    <Form />
                </section>
            </Navigation>
        </>
    )
}

export default Profile