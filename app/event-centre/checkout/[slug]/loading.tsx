const Loading = () => {
    return (<>
        <section className="flex flex-col justify-center items-center min-h-[85vh] space-y-4 md:space-y-0 md:space-x-6 md:flex-row xl:space-x-12">
            <div className="min-h-[50vh] mt-4 max-h-[60vh] animate-pulse bg-slate-200 w-full md:w-[50%] lg:w-[45%]"></div>
            <div className="w-full md:w-[50%] lg:w-[45%]">
                <p className="animate-pulse bg-slate-200 my-4 h-4"></p>
                <p className="animate-pulse bg-slate-200 my-4 h-4"></p>
                <p className="animate-pulse bg-slate-200 my-4 h-4"></p>
                <p className="animate-pulse bg-slate-200 my-4 h-4"></p>
            </div>
        </section>
    </>)
}

export default Loading