import React from 'react'
import Form from './components/Form'

const ForgotPassword = () => {
    return (
        <section className="min-h-screen flex items-center md::justify-end bg-authBg bg-cover bg-center p-4 bg-no-repeat">
            <div className="rounded-xl w-[90%] mx-auto md:w-[50%] lg:w-[40%] min-h-fit md:mr-10 p-4 bg-[#856D47]">
                <div className="text-white mb-4">
                    <h1>Quarvo</h1>
                </div>
                <Form />
            </div>
        </section>
    )
}

export default ForgotPassword