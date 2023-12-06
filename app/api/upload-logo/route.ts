import { cloudinary } from "@/utils/upload";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export async function POST(req: NextRequest) {

    const { id, logo } = await req.json();

    try {
        const uploadedLogo = await cloudinary.uploader.upload(logo, {
            upload_preset: 'quarvo'
        })
        const eventCentre = await prisma.eventCentre.findUnique({
            where: {
                id: id,
            },
        });

        if (eventCentre) {
            // Update the event centre with the new event logo
            const updatedEventCentre = await prisma.eventCentre.update({
                where: {
                    id: id,
                },
                data: {
                    event_logo: uploadedLogo.secure_url,
                },
            });
        }

        return NextResponse.json({
            message: 'Event logo uploaded successfully',
            status: 200,
            uploadedLogo
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to upload files", status: 500 });
    }
}
