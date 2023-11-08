
const Loading = () => {
    return (<>
        <div className="flex flex-wrap justify-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => (
                <div key={num} className="h-[300px] m-4 bg-slate-200 animate-pulse w-[200px]"></div>
            ))}
        </div>
    </>)
}

export default Loading