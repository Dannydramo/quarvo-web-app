import Sidebar from "./Sidebar";

const Navigation = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <section className="md:grid md:grid-cols-6">
                <aside className="fixed">
                    <Sidebar />
                </aside>
                <main className="w-full md:ml-[180px] lg:ml-[200px] xl:ml-[220px]">{children}</main>
            </section>
        </>
    );
}

export default Navigation

// #fef9ee #571b0b
// #4f2f0c #e8d5bf
// #bc6342 #eedfd6