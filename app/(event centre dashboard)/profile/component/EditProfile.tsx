"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EventCentreDetails } from "@/types/eventTypes";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, FormEvent, useState } from "react";
import { EventStore } from "@/store/eventInfo";
import {
  fetchEventCentreDetails,
  postEditCentreDetails,
} from "@/utils/eventUtils";

const EditProfile: React.FC<{ eventCentreDetails: EventCentreDetails }> = ({
  eventCentreDetails,
}) => {
  const { eventDetails } = EventStore();
  const [editProfileDetails, setEditProfileDetails] = useState({
    id: eventDetails?.id,
    amenities: eventCentreDetails.amenities,
    address: eventCentreDetails.address,
    description: eventCentreDetails.description,
    openDays: eventCentreDetails.open_days,
    price: eventCentreDetails.price,
  });
  const [loading, setLoading] = useState(false);

  const stringToArray = (inputString: string, delimiter: string = ",") => {
    return inputString.split(delimiter).map((value) => value.trim());
  };

  const handleArrayInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newArray = stringToArray(e.target.value);
    setEditProfileDetails({
      ...editProfileDetails,
      amenities: newArray,
    });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    inputField: string
  ) => {
    const { value } = e.target;
    setEditProfileDetails((prevState) => ({
      ...prevState,
      [inputField]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { message, data, status } = await postEditCentreDetails(
        editProfileDetails
      );
      if (status !== 200) {
        console.log(message);
      }
      console.log(message, data);
      setLoading(false);
      fetchEventCentreDetails();
    } catch (error: any) {
      setLoading(false);
      console.error("Form submission error:", error.message);
    }
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <p className="cursor-pointer mb-12">Edit Profile</p>
        </SheetTrigger>
        <SheetContent className="min-h-[100vh] w-full overflow-y-scroll">
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="grid mt-4 gap-4">
                <div>
                  <label htmlFor="amenities">Amenities</label>
                  <Input
                    type="text"
                    value={editProfileDetails.amenities.join()}
                    placeholder="Amenities (Comma Seperated)"
                    className="outline-none mt-1 border h-12"
                    onChange={handleArrayInputChange}
                  />
                </div>
                <div className="">
                  <label htmlFor="price">Price</label>
                  <Input
                    type="text"
                    value={editProfileDetails.price}
                    onChange={(e) => handleInputChange(e, "price")}
                    placeholder="Price"
                    className="outline-none mt-1 border h-12"
                  />
                </div>
              </div>

              <div className="grid mt-4 gap-4">
                <div className="">
                  <label htmlFor="address">Address</label>
                  <Input
                    type="text"
                    value={editProfileDetails.address}
                    onChange={(e) => handleInputChange(e, "address")}
                    placeholder="Address"
                    className="outline-none mt-1 border h-12"
                  />
                </div>
                <div className="">
                  <label htmlFor="openingdays">Opening Days</label>
                  <Input
                    type="text"
                    value={editProfileDetails.openDays}
                    onChange={(e) => handleInputChange(e, "openDays")}
                    placeholder="Opening Days"
                    className="outline-none mt-1 border h-12"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="description">Description</label>
                <Textarea
                  value={editProfileDetails.description}
                  onChange={(e) =>
                    setEditProfileDetails({
                      ...editProfileDetails,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description"
                  className="outline-none border"
                />
              </div>
            </div>
            <SheetFooter>
              <Button
                type="submit"
                disabled={loading}
                className="mb-24 md:mb-0 mt-4"
              >
                {loading ? "Saving Changes" : "Save changes"}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditProfile;
