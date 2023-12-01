import React from 'react'
import Navigation from '../components/Navigation'
import { Metadata } from "next"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Overview from './components/overview'
import HappyCustomers from './components/happy-customers'
import Revenue from './components/revenue'

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Example dashboard app built using the components.",
}

const Dashboard = () => {
    return (
        <>
            <Navigation>
                <section className="w-[95%] mx-auto">
                    <div className="flex-col flex">
                        <div className="flex-1 space-y-4 p-2 md:p-8 pt-6">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <HappyCustomers />
                                <Revenue />
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Sales</CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <rect width="20" height="14" x="2" y="5" rx="2" />
                                            <path d="M2 10h20" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">+12,234</div>
                                        <p className="text-xs text-muted-foreground mt-2">
                                            +19% from last month
                                        </p>
                                    </CardContent>
                                </Card>
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
    )
}

export default Dashboard