import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
    return (<>
        <div className="flex flex-wrap justify-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => (
                <Skeleton key={num} className="h-[300px] m-4 bg-green-500 w-[200px]" />
            ))}
        </div>
    </>)
}

export default Loading