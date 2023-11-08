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
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { EventStore } from "@/store/eventInfo"
import { ChangeEvent } from "react"

const UserNav = () => {
    const { eventDetails } = EventStore()
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
            const base64File = await convertFileToBase64(file);
            const res = await fetch('/api/upload-logo', {
                method: 'POST',
                body: JSON.stringify({
                    id: eventDetails?.id,
                    logo: base64File
                }),
            });
            const data = await res.json();
        } catch (error) {

        }
    }
    return (
        <>
            {
                !eventDetails?.event_logo ? <>
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
                            <DropdownMenuItem className="md:hidden">
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </> :
                    <>
                        <AvatarImage src={eventDetails.event_logo} alt="event logo" className="hidden md:block" />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="md:hidden">
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={eventDetails.event_logo} alt="event logo" />

                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuItem className="md:hidden">
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
            }
        </>

    )
}

export default UserNav