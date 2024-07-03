import React from 'react';
import Form from './components/Form';

const SignUp = () => {
    return (
        <section className="flex flex-col bg-white-1 lg:flex-row w-full text-lightGrey text-base relative min-h-[100vh]">
            <div className=" w-1/2 hidden min-h-screen lg:block pl-3rem bg-authBg bg-center bg-no-repeat bg-cover"></div>
            <div className="w-full lg:w-1/2 flex justify-center items-center min-h-screen">
                <div className="w-[90%] md:w-[80%] lg:w-[85%] mx-auto py-4">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl mb-4 font-semibold">
                            Create an account
                        </h1>
                        <p className="mb-4">
                            Securely create your Quarvo account.
                        </p>
                    </div>
                    <Form />
                </div>
            </div>
        </section>
    );
};

export default SignUp;
