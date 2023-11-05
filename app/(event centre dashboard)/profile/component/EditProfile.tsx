'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { EventCentreDetails } from "@/types/eventTypes"
import { TimePicker } from 'antd';
import { Textarea } from "@/components/ui/textarea";


const EditProfile: React.FC<{ eventCentreDetails: EventCentreDetails }> = ({ eventCentreDetails }) => {
    console.log(eventCentreDetails)
    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <p >Edit Profile</p>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Edit profile</SheetTitle>
                        <SheetDescription>
                            Make changes to your profile here. Click save when you're done.
                        </SheetDescription>
                    </SheetHeader>
                    <form>
                        <div>
                            <div className="grid gap-4">
                                <div>
                                    <label htmlFor="amenities">Amenities</label>
                                    <Input type="text" placeholder="Amenities (Comma Seperated)" className="outline-none mt-1 border h-12" />
                                </div>
                                <div className="">
                                    <label htmlFor="price">Price</label>
                                    <Input type="text" placeholder="Price" className="outline-none mt-1 border h-12" />
                                </div>
                            </div>

                            <div className="grid gap-4">
                                <div className="">
                                    <label htmlFor="address">Address</label>
                                    <Input type="text" placeholder="Address" className="outline-none mt-1 border h-12" />
                                </div>
                                <div className="">
                                    <label htmlFor="openingdays">Opening Days</label>
                                    <Input type="text" placeholder="Opening Days" className="outline-none mt-1 border h-12" />
                                </div>
                            </div>
                            <div className="grid gap-4">
                                <div className="">
                                    <label htmlFor="openitime">Opening Time</label>
                                    <TimePicker use12Hours format="h:mm a" placeholder="Select Opening Time" className='outline-none mt-1 border h-12 w-full' />
                                </div>
                                <div className="">
                                    <label htmlFor="closetime">Closing Time</label>
                                    <TimePicker use12Hours format="h:mm a" placeholder="Select Closing Time" className='outline-none mt-1 border h-12 w-full' />
                                </div>
                            </div>
                            <div className="grid gap-4">
                                <div className="">
                                    <label htmlFor="upload">{"Upload Image(s)"}</label>
                                    <Input type="file" accept=".jpg, .jpeg, .png" multiple className="outline-none mt-1 border h-12" />
                                </div>

                            </div>
                            <div className="mt-4">
                                <label htmlFor="description">Description</label>
                                <Textarea placeholder="Description" className="outline-none border" />
                            </div>

                        </div>
                        <Button type="submit" className="mt-4 outline-none">Submit Details</Button>
                    </form>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </>
    )
}

export default EditProfile