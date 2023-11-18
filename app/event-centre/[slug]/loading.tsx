const Loading = () => {
    return (<>
        <section>
            <div className="w-full min-h-[50vh] mt-4 max-h-[60vh] animate-pulse bg-slate-200"></div>
            <main className="w-[95%] overflow-x-hidden mx-auto mt-4 mb-20 md:mb-0">
                <div className="w-full md:max-w-[700px] h-[350px] mt-4 bg-slate-200 animate-pulse" ></div>
                <div className="w-full h-[100px] mt-4 mb-6 bg-slate-200 animate-pulse"></div>
            </main>
        </section>
    </>)
}

export default Loading