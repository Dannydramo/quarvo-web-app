import { cloudinary } from "@/utils/upload";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    let files: any[] = [];

    // Wait for the JSON data to be parsed
    const jsonData = await req.json();

    if (Array.isArray(jsonData)) {
        // If the incoming data is an array, assume it's multiple files
        files = jsonData;
    } else {
        // If it's not an array, assume it's a single file
        files = [jsonData];
    }

    try {
        const uploadPromises = files.map(async (file) => {
            const uploadedImage = await cloudinary.uploader.upload(file, {
                upload_preset: 'quarvo'
            });
            return uploadedImage;
        });

        const uploadedImages = await Promise.all(uploadPromises);

        return NextResponse.json({
            message: 'Files uploaded successfully',
            status: 200,
            uploadedImages
        });
    } catch (error) {
        console.error(error);
        // return NextResponse.error("Failed to upload files", 500);
    }
}
