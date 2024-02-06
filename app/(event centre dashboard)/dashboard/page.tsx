import React from "react";
import Navigation from "../components/Navigation";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Overview from "./components/overview";
import HappyCustomers from "./components/happy-customers";
import Revenue from "./components/revenue";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Example dashboard app built using the components.",
};

const Dashboard = () => {
    return (
        <>
            <Navigation>
                <section className="w-[95%] mx-auto">
                    <div className="flex-col flex">
                        <div className="flex-1 space-y-4 p-2 md:p-8 pt-6">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <HappyCustomers />
                                <Revenue />
                            </div>
                            <div className="">
                                <Card className="">
                                    <CardHeader>
                                        <CardTitle>Overview</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pl-2">
                                        <Overview />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
            </Navigation>
        </>
    );
};

export default Dashboard;
