import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
    return (<>
        <section className="md:flex justify-between">
            <aside className="fixed">
                <Skeleton className="hidden md:h-screen md:p-6 lg:w-[210px] bg-green-500 md:w-[190px] md:mx-auto md:flex md:justify-center lg:relative  fixed md:relative bottom-0 right-0 left-0  shadow-md md:shadow-none justify-between  py-4 z-50 active:z-50 m-6 px-6 md:m-0 md:px-0 rounded-lg md:rounded-none" />
            </aside>
            <main className="w-[90%] mx-auto mb-20 md:mb-0 md:ml-[200px] lg:ml-[220px]">
                <>
                    <Skeleton className="w-full h-5 bg-green-500" />
                    <Skeleton className="w-full min-h-[50vh] mt-4 max-h-[60vh] bg-green-500" />
                    <Skeleton className="w-full md:max-w-[700px] h-40 mt-4 bg-green-500" />
                    <Skeleton className="w-full h-20 bg-green-500" />
                </>
            </main>
        </section>
    </>)
}

export default Loading