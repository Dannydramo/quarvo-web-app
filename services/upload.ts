import axios from 'axios';
import { cloudinaryConfig } from '../utils/cloudinary';

interface ImageUploadResponse {
    secure_url: string;
}

export const uploadImagesToCloudinary = async (
    files: File[]
): Promise<string[]> => {
    const uploadedImageUrls: string[] = [];
    if (
        !cloudinaryConfig ||
        !cloudinaryConfig.cloudName ||
        !cloudinaryConfig.uploadPreset
    ) {
        throw new Error('Cloudinary configuration is not properly set.');
    }
    try {
        for (const file of files) {
            const base64Data = await readFileAsBase64(file);
            const response = await axios.post<ImageUploadResponse>(
                `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
                {
                    file: base64Data,
                    upload_preset: cloudinaryConfig.uploadPreset,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: false,
                }
            );
            uploadedImageUrls.push(response.data.secure_url);
        }
        return uploadedImageUrls;
    } catch (error) {
        console.error('Error uploading images:', error);
        throw error;
    }
};

export const uploadLogoToCloudinary = async (file: File): Promise<string> => {
    if (
        !cloudinaryConfig ||
        !cloudinaryConfig.cloudName ||
        !cloudinaryConfig.uploadPreset
    ) {
        throw new Error('Cloudinary configuration is not properly set.');
    }
    try {
        const base64Data = await readFileAsBase64(file);
        const response = await axios.post<ImageUploadResponse>(
            `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
            {
                file: base64Data,
                upload_preset: cloudinaryConfig.uploadPreset,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: false,
            }
        );
        return response.data.secure_url;
    } catch (error) {
        console.error('Error uploading logo:', error);
        throw error;
    }
};

const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (reader.result) {
                resolve(reader.result.toString());
            } else {
                reject(new Error('Failed to read file as base64'));
            }
        };
        reader.onerror = (error) => reject(error);
    });
};
