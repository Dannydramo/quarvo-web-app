import Skeleton from "react-loading-skeleton";

const Loading = () => {
    return (<>
        <div className="flex flex-wrap justify-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => (
                <Skeleton key={num} containerClassName="h-[300px] m-4 bg-green-500 w-[200px]" width="inherit"
                    height="inherit" />
            ))}
        </div>
    </>)
}

export default Loading