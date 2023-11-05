import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
    return (<>
        <section className="md:flex justify-between">
            <aside className="fixed">
                <Skeleton className="hidden md:h-screen md:p-6 lg:w-[210px] md:w-[190px] md:mx-auto md:flex md:justify-center lg:relative  fixed md:relative bottom-0 right-0 left-0  shadow-md bg-[#571b0b] md:shadow-none justify-between  py-4 z-50 active:z-50 m-6 px-6 md:m-0 md:px-0 rounded-lg md:rounded-none bg-white-1 " />
            </aside>
            <main className="w-full mb-20 md:mb-0 md:ml-[200px] lg:ml-[220px]">
                <>
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full min-h-[50vh] mt-4 max-h-[60vh]" />
                    <Skeleton className="w-full md:max-w-[700px] mt-4" />
                    <Skeleton className="w-full h-20" />
                </>
            </main>
        </section>
    </>)
}

export default Loading