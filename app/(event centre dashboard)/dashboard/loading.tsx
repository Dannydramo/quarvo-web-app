import Skeleton from "react-loading-skeleton";

const Loading = () => {
    return (<>
        <section className="md:flex justify-between">
            <aside className="fixed">
                <Skeleton containerClassName="hidden md:h-screen md:p-6 lg:w-[210px] bg-slate-50 md:w-[190px] md:mx-auto md:flex md:justify-center lg:relative  fixed md:relative bottom-0 right-0 left-0  shadow-md md:shadow-none justify-between  py-4 z-50 active:z-50 m-6 px-6 md:m-0 md:px-0 rounded-lg md:rounded-none" width="inherit"
                    height="inherit" />
            </aside>
            <main className="w-[90%] mx-auto mb-20 md:mb-0 md:mr-5 md:ml-[200px] lg:ml-[220px]">
                <>
                    <Skeleton containerClassName="w-full h-5 mt-4 bg-green-500" width="inherit"
                        height="inherit" />
                    <Skeleton containerClassName="w-full min-h-[50vh] mt-4 max-h-[60vh] bg-green-500" width="inherit"
                        height="inherit" />
                    <Skeleton containerClassName="w-full md:max-w-[700px] h-[15rem] mt-4 bg-green-500" width="inherit"
                        height="inherit" />
                    <Skeleton containerClassName="w-full h-20 mt-4 bg-green-500" width="inherit"
                        height="inherit" />
                </>
            </main>
        </section>
    </>)
}

export default Loading