import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Hero = () => {
    return (
        <section className="">
            <div className="w-[95%] sm:w-[90%] mx-auto max-w-[1800px] py-6 flex flex-col lg:flex-row gap-8 justify-between items-center">
                <div className="w-full lg:w-1/2">
                    <div className="">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                            Discover and Book the <br />
                            Best Events
                        </h1>
                        <p className="max-w-[600px] mt-8 text-muted-foreground md:text-xl">
                            Our event booking platform connects you with a wide
                            range of exciting events, from concerts and
                            festivals to conferences and workshops. Find your
                            next unforgettable experience.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row my-8">
                        <Link
                            href="/event-centres"
                            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        >
                            Browse Event Centres
                        </Link>
                        <Link
                            href="/event-center-signup"
                            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        >
                            Register Event Centre
                        </Link>
                    </div>
                </div>
                <div className="w-full lg:w-[50%]">
                    <Image
                        src={'/hero_bg.jpg'}
                        alt="hero_image"
                        width={600}
                        height={600}
                        className="w-full rounded-3xl h-[50vh] md:h-[80vh]"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
