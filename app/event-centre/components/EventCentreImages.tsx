import React from 'react';
import Image from 'next/image';
import { Gallery } from 'react-grid-gallery';

const EventCentreImages: React.FC<{ eventImages: string[] }> = ({
    eventImages,
}) => {
    const galleryImages = eventImages.map((image, index) => ({
        src: image,
        width: 600,
        height: 400,
        caption: `Image ${index + 1}`,
        alt: `Image ${index + 1}`,
    }));

    return (
        <div className="w-full">
            <Gallery images={galleryImages} />
        </div>
    );
};

export default EventCentreImages;
