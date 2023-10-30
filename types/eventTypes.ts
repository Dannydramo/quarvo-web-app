export interface eventRegDetails {
    id: string
    state: string
    event_centre_name: string
    email: string
    phone_number: string
    slug: string
}

export interface EventCentreDetails {
    id: string | undefined;
    main_image: string;
    images: string[];
    description: string;
    open_time: string;
    address: string;
    close_time: string;
    open_days: string;
    lga: string;
    price: string;
    amenities: string[];
    video: string;
}
