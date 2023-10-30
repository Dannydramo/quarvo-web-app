import Sidebar from "./Sidebar";

const Navigation = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <section className="md:flex justify-between">
                <aside className="fixed">
                    <Sidebar />
                </aside>
                <main className="w-full md:ml-[200px] lg:ml-[220px]">{children}</main>
            </section>
        </>
    );
}

export default Navigation
