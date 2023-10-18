import Sidebar from "./Sidebar";

const Navigation = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <section className="lg:grid lg:grid-cols-6">
                <aside className="lg:col-span-1 fixed">
                    <Sidebar />
                </aside>
                <main className="lg:col-span-5 w-full lg:ml-[200px] xl:ml-[220px]">{children}</main>
            </section>
        </>
    );
}

export default Navigation

// #fef9ee #571b0b
// #4f2f0c #e8d5bf
// #bc6342 #eedfd6