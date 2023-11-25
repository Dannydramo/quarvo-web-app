import React from 'react'
import Form from './components/Form'

const SignUp = () => {
    return (
        <section className="flex flex-col bg-white-1 lg:flex-row w-full text-lightGrey text-base relative min-h-[100vh]">

            <div className=" w-1/2 hidden min-h-screen lg:block pl-3rem bg-authBg bg-center bg-no-repeat bg-cover"></div>
            <div className="w-[90%] md:w-[80%] mx-auto lg:w-1/2  min-h-screen ">
                <div className="flex justify-center md:mt-8 lg:mt-4 items-center ">
                    <div className="w-[95%] lg:w-[85%] mx-auto py-4">
                        <div className="text-center mb-6">
                            <h1 className="text-2xl mb-4 font-semibold">
                                Create an account
                            </h1>
                            {/* <p className="mb-4">
                            Securely Login into your Quarvo account.
                        </p> */}
                        </div>
                        <Form />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp