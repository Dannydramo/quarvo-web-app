'use client'
import { fetchImages } from '@/utils/imageUtils'
import { useEffect, useState } from 'react'
import { Carousel } from "antd";
import Image from 'next/image';

const EventCentreImages = () => {
    const [eventImages, setEventImages] = useState([])
    useEffect(() => {
        const fetchEventImages = async () => {
            try {

                const { message, data, status } = await fetchImages()
                if (status !== 200) {
                    console.log(message);
                }
                setEventImages(data.images)
            } catch (error) {
                console.log('Unable to image');
            }
        }
        fetchEventImages()
    }, [])


    return (
        <>
            <Carousel autoplay>
                {eventImages.map((image, index) => (
                    <Image width={300} height={100} src={image} priority={true} quality={100} className='h-[300px] lg:min-h-[60vh] mt-4 lg:max-h-[70vh] w-full' key={index} loading="lazy" alt={'Images'} />
                ))}
            </Carousel>
        </>
    )
}

export default EventCentreImages