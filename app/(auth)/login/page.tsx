import Link from 'next/link';
import Form from './components/Form';

const Login = () => {
    return (
        <section className="flex flex-col bg-white-1 lg:flex-row w-full text-lightGrey text-base relative min-h-[100vh]">
            <div className="w-full lg:w-1/2 flex justify-center items-center min-h-screen">
                <div className="w-[90%] md:w-[80%] lg:w-[85%] mx-auto py-4">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl mb-4 font-semibold">
                            Login to your account
                        </h1>
                        <p className="mb-4">
                            Securely Login into your Quarvo account.
                        </p>
                    </div>
                    <Form />
                    <div className="flex items-center text-xs my-4 w-full">
                        <hr className="flex-grow border-gray-300" />
                        <span className="px-3 text-gray-500">OR</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>

                    <div className="w-full text-xs">
                        <Link
                            href="/event-center-login"
                            className="block w-full mt-2 rounded-sm py-3 text-center bg-gray-300"
                        >
                            Login as an Event Center
                        </Link>
                    </div>
                </div>
            </div>
            <div className=" w-1/2 hidden min-h-screen lg:block pl-3rem bg-authBg bg-center bg-no-repeat bg-cover"></div>
        </section>
    );
};

export default Login;
