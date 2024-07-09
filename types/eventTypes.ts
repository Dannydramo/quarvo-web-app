export interface eventRegDetails {
    id: string;
    state: string;
    event_centre_name: string;
    email: string;
    phone_number: string;
    slug: string;
    event_logo: string | null;
    event_centre_details?: EventCentreDetails | null;
}

export interface EventCentreDetails {
    id: string | undefined;
    description: string;
    open_time: string;
    address: string;
    close_time: string;
    open_days: string;
    lga: string;
    price: string;
    amenities: string[];
    images: string[];
}

export interface reviewProps {
    id: string;
    full_name: string;
    review_comment: string;
    created_at: Date;
    updatedAt: Date;
}

export interface bookedProps {
    user: any;
    created_at: string;
    date: string;
    event_centre_id: string;
    id: string;
    amount: string;
    updatedAt: string;
    user_id?: string;
    physical_user_name?: string;
    physical_user_email?: string;
    physical_user_phone?: string;
}

export interface EventProps {
    eventCentre: eventRegDetails;
}
