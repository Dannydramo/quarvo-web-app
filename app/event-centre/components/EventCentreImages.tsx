import React from 'react';
import Image from 'next/image';

const EventCentreImages: React.FC<{ eventImages: string[] }> = ({ eventImages }) => {
    const [firstImage, ...restImages] = eventImages;

    return (
        <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6'>
            <div className='w-[100%]'>
                <Image
                    width={600}
                    height={400}
                    src={firstImage}
                    priority={true}
                    quality={100}
                    className="h-[300px] md:w-[400px] md:min-h-[450px] rounded-2xl w-full"
                    alt="First Image"
                />
            </div>
            <div className={`grid gap-4 grid-cols-2`}>
                {restImages.map((image, index) => (
                    <div
                        key={index}
                    >
                        <Image
                            width={600}
                            height={400}
                            src={image}
                            priority={true}
                            quality={100}
                            className="h-[220px] rounded-2xl w-full"
                            alt={`Image ${index + 2}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventCentreImages;
