'use client'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { EventStore } from "@/store/eventInfo"
import { ChangeEvent, useState } from "react"
import UploadImage from "./upload-image"
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import Spinner from "@/svgs/Spinner"

const UserNav = () => {
    const { eventDetails } = EventStore()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const convertFileToBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve(e.target?.result);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(file);
        });
    };
    const handleLogoChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        try {
            setLoading(true)
            const base64File = await convertFileToBase64(file);
            const res = await fetch('/api/upload-logo', {
                method: 'POST',
                body: JSON.stringify({
                    id: eventDetails?.id,
                    logo: base64File
                }),
            });
            const data = await res.json();
            setLoading(false)
            if (data.status === 200) {
                toast.success(data.message)
            } else {
                toast.error('Failed to upload logo')
            }

        } catch (error) {
            setLoading(false)
            toast.error('Unable to upload logo. Please try again later')
        }
    }

    const logOutUser = () => {
        deleteCookie("jwtToken");
        toast.success('Logout Succesful')
        router.replace('/event-center-login')
    }

    return (
        <>
            {loading &&
                <>
                    <div className='absolute bg-white top-4 right-4 rounded-md'>
                        <Spinner className="h-2 w-2 animate-spin" />
                        <p>Uploading Logo..</p>
                    </div>
                </>
            }
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                            {
                                eventDetails?.event_logo && <AvatarImage src={eventDetails.event_logo} alt="event logo" />
                            }

                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className='block md:hidden'>
                        <UploadImage />
                    </DropdownMenuLabel>
                    <DropdownMenuLabel className="font-normal">
                        {
                            !eventDetails?.event_logo &&
                            <>
                                <div className="relative h-[20px]">
                                    <div className="absolute bottom-0 right-0 h-[20px] w-full overflow-hidden">
                                        <div className="relative">
                                            <p>Uplaod Event Logo</p>
                                            <Input
                                                type="file"
                                                className="w-full h-full absolute cursor-pointer bottom-0 right-0 z-12 opacity-0"
                                                accept=".jpg, .jpeg, .png"
                                                onChange={handleLogoChange}
                                            />
                                        </div>
                                    </div>
                                </div>


                            </>
                        }
                    </DropdownMenuLabel>
                    <DropdownMenuGroup>
                    </DropdownMenuGroup>
                    <DropdownMenuItem onClick={logOutUser} className="md:hidden">
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default UserNav