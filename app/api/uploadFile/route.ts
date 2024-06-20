import { cloudinary } from '@/utils/upload';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

export async function POST(req: NextRequest) {
    let files: any[] = [];

    const { id, imageFile } = await req.json();

    if (Array.isArray(imageFile)) {
        files = imageFile;
    } else {
        files = [imageFile];
    }

    try {
        const uploadPromises = files.map(async (file) => {
            const uploadedImage = await cloudinary.uploader.upload(file, {
                upload_preset: 'quarvo',
            });
            return uploadedImage;
        });

        const uploadedImages = await Promise.all(uploadPromises);
        const imageUrl = uploadedImages.map(
            (image: { secure_url: string }) => image.secure_url
        );
        const uploadImageUrl = await prisma.eventCentreImages.create({
            data: {
                images: imageUrl,
                main_image: imageUrl[0],
                event_centre: {
                    connect: {
                        id: id,
                    },
                },
            },
        });
        return NextResponse.json({
            message: 'Images uploaded successfully',
            status: 200,
            uploadImageUrl,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: 'Failed to upload files',
            status: 500,
        });
    }
}
