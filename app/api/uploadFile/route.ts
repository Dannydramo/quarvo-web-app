import { cloudinary } from "@/utils/upload";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()
export async function POST(req: NextRequest) {
    let files: any[] = [];

    // Wait for the JSON data to be parsed
    const { id, imageFile } = await req.json();

    if (Array.isArray(imageFile)) {
        // If the incoming data is an array, assume it's multiple files
        files = imageFile;
    } else {
        // If it's not an array, assume it's a single file
        files = [imageFile];
    }

    try {
        const uploadPromises = files.map(async (file) => {
            const uploadedImage = await cloudinary.uploader.upload(file, {
                upload_preset: 'quarvo'
            });
            return uploadedImage;
        });

        const uploadedImages = await Promise.all(uploadPromises);
        const imageUrl = uploadedImages.map((image: { secure_url: string }) => image.secure_url);
        const uploadImageUrl = await prisma.eventCentreImages.create({
            data: {
                images: imageUrl,
                main_image: imageUrl[0],
                event_centre: {
                    connect: {
                        id: id,
                    },
                },
            }
        })
        return NextResponse.json({
            message: 'Files uploaded successfully',
            status: 200,
            uploadImageUrl
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to upload files", status: 500 });
    }
}
