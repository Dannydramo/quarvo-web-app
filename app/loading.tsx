
const Loading = () => {
    return (<>
        <div className=" w-[90%] mx-auto display_event">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => (
                <div key={num} className="h-[350px] bg-slate-200 animate-pulse w-full"></div>
            ))}
        </div>
    </>)
}

export default Loading