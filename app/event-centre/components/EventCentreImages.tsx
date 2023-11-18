import Carousel from 'antd/es/carousel'
import React from 'react'
import Image from 'next/image';

const EventCentreImages: React.FC<{ eventImages: string[] }> = ({ eventImages }) => {
    return (
        <>
            <Carousel autoplay>
                {eventImages.map((image, index) => (
                    <Image width={600} height={400} src={image} priority={true} quality={100} className='h-[300px] lg:min-h-[60vh] lg:max-h-[70vh] w-full' key={index} alt={'Images'} />
                ))}
            </Carousel>
        </>
    )
}

export default EventCentreImages