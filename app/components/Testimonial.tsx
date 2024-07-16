import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

const Testimonial = () => {
    return (
        <section className="bg-muted py-16">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="mb-8 text-3xl font-bold tracking-tight">
                    What Our Customers Say
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardContent className="p-6">
                            <div className="mb-4 flex items-center">
                                <Avatar>
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="ml-4">
                                    <h4 className="text-lg font-semibold">
                                        John Doe
                                    </h4>
                                    <p className="text-muted-foreground">
                                        Software Engineer
                                    </p>
                                </div>
                            </div>
                            <p className="text-muted-foreground">
                                "EventHub made it so easy to find and book the
                                perfect event\n for my team. The platform is
                                user-friendly and the event\n selection is
                                fantastic."
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="mb-4 flex items-center">
                                <Avatar>
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="ml-4">
                                    <h4 className="text-lg font-semibold">
                                        Jane Smith
                                    </h4>
                                    <p className="text-muted-foreground">
                                        Marketing Manager
                                    </p>
                                </div>
                            </div>
                            <p className="text-muted-foreground">
                                "I've used EventHub for several company events
                                now, and\n they've always exceeded my
                                expectations. The customer\n service is
                                top-notch."
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="mb-4 flex items-center">
                                <Avatar>
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="ml-4">
                                    <h4 className="text-lg font-semibold">
                                        Michael Johnson
                                    </h4>
                                    <p className="text-muted-foreground">
                                        Event Planner
                                    </p>
                                </div>
                            </div>
                            <p className="text-muted-foreground">
                                "EventHub has been a game-changer for my event
                                planning\n business. The platform's features and
                                tools make my job so\n much easier."
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
