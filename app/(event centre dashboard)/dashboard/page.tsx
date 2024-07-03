import React from 'react';
import Navigation from '../components/Navigation';
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Overview from './components/overview';
import HappyCustomers from './components/happy-customers';
import Revenue from './components/revenue';
import DashboardLayout from '../components/DashboardLayout';

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Example dashboard app built using the components.',
};

const Dashboard = () => {
    return (
        <>
            <DashboardLayout>
                <section className="w-[95%] mx-auto">
                    <div className="flex-col flex">
                        <div className="flex-1 space-y-4 p-2 md:p-8 pt-6">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <HappyCustomers />
                                <Revenue />
                            </div>
                            <div className="">
                                <Card className="bg-[#F1F5EF] text-[#095A66]">
                                    <CardHeader>
                                        <CardTitle className="text-sm md:text-base">
                                            Overview
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pl-2">
                                        <Overview />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
            </DashboardLayout>
        </>
    );
};

export default Dashboard;
