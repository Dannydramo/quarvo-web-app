import { cloudinary } from "@/utils/upload";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const file = await req.json();



    try {

        const uploadedVideo = await cloudinary.uploader.upload(file, {
            resource_type: "video",
            upload_preset: 'quarvo'
        });





        return NextResponse.json({
            message: 'Video uploaded successfully',
            status: 200,
            uploadedVideo
        });
    } catch (error) {
        console.error(error);
        // return NextResponse.error("Failed to upload files", 500);
    }
}
