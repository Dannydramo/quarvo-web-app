const Loading = () => {
    return (<>
        <section className="md:flex justify-between">
            <aside className="fixed">
                <div className="animate-pulse hidden md:h-screen md:p-6 lg:w-[210px] bg-slate-200 md:w-[190px] md:mx-auto md:flex md:justify-center lg:relative  fixed md:relative bottom-0 right-0 left-0  shadow-md md:shadow-none justify-between  py-4 z-50 active:z-50 m-6 px-6 md:m-0 md:px-0 rounded-lg md:rounded-none"></div>
            </aside>
            <main className="w-[90%] mx-auto mb-20 md:mb-0 md:mr-5 md:ml-[200px] lg:ml-[220px]">
                <>
                    <div className="w-full h-5 mt-4 bg-slate-200 animate-pulse"></div>
                    <div className="w-full min-h-[50vh] mt-4 max-h-[60vh] animate-pulse bg-slate-200"></div>
                    <div className="w-full md:max-w-[700px] h-[15rem] mt-4 bg-slate-200 animate-pulse" ></div>
                    <div className="w-full h-20 mt-4 bg-slate-200 animate-pulse"></div>


                </>
            </main>
        </section>
    </>)
}

export default Loading