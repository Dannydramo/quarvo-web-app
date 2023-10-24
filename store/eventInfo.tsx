import { create } from 'zustand'
import { eventRegDetails } from '@/types/eventTypes'

interface EventStoreInterface {
    eventDetails: eventRegDetails | null;
    setEventDetails: (eventDetails: eventRegDetails | null) => void;
}

export const EventStore = create<EventStoreInterface>((set) => ({
    eventDetails: null,
    setEventDetails: (eventDetails) => set({ eventDetails }),
}))