'use client'
import { EventStore } from "@/store/eventInfo";
import UserNav from "../dashboard/components/user-nav";
import Sidebar from "./Sidebar";
import UploadImage from "../dashboard/components/upload-image";

const Navigation = ({ children }: { children: React.ReactNode }) => {
    const { eventDetails } = EventStore()
    return (
        <>
            <section className="md:flex justify-between">
                <aside className="fixed z-[100000]">
                    <Sidebar />
                </aside>
                <main className="w-full overflow-x-hidden mb-20 md:mb-0 md:ml-[200px] lg:ml-[220px]">
                    <>
                        <div className="border-b">
                            <div className="flex h-16 items-center px-4">
                                Welcome {eventDetails?.event_centre_name}
                                <div className="ml-auto flex items-center space-x-4">
                                    <UploadImage />
                                    <UserNav />
                                </div>
                            </div>
                        </div>
                        {children}
                    </>
                </main>
            </section>
        </>
    );
}

export default Navigation
