import { CalendarDaysIcon } from 'lucide-react';
import { SearchIcon } from 'lucide-react';
import { TicketIcon } from 'lucide-react';
import React from 'react';

const Choose = () => {
    return (
        <section className="py-12 md:py-24">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Why Choose Our Platform?
                    </h2>
                    <p className="mt-4 max-w-[600px] text-muted-foreground md:text-xl">
                        Discover the benefits of using our event booking
                        platform.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-muted rounded-md p-4">
                        <SearchIcon className="w-8 h-8 text-primary" />
                        <h3 className="text-lg font-semibold mt-2">
                            Comprehensive Search
                        </h3>
                        <p className="text-muted-foreground mt-2">
                            Easily find events based on location, date,
                            category, and more.
                        </p>
                    </div>
                    <div className="bg-muted rounded-md p-4">
                        <CalendarDaysIcon className="w-8 h-8 text-primary" />
                        <h3 className="text-lg font-semibold mt-2">
                            Seamless Booking
                        </h3>
                        <p className="text-muted-foreground mt-2">
                            Secure and convenient booking process with instant
                            confirmation.
                        </p>
                    </div>
                    <div className="bg-muted rounded-md p-4">
                        <TicketIcon className="w-8 h-8 text-primary" />
                        <h3 className="text-lg font-semibold mt-2">
                            Exclusive Offers
                        </h3>
                        <p className="text-muted-foreground mt-2">
                            Access special discounts and promotions for our
                            platform users.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Choose;
