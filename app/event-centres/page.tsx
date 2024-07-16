'use client';
import { getEventCentres } from '@/utils/eventUtils';
import EventCard from '../components/EventCard';
import UserDashboardLayout from '../components/UserDashboardLayout';
import { useEffect, useState } from 'react';
import NaijaStates from 'naija-state-local-government';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const EventCentres = () => {
    const [eventCentres, setEventCentres] = useState<any[]>([]);
    const [filteredEventCentres, setFilteredEventCentres] = useState<any[]>([]);
    const [filters, setFilters] = useState({
        searchTerm: '',
        priceFilter: '',
        locationFilter: '',
    });

    const states = NaijaStates.all().map(
        (state: { state: any }) => state.state
    );

    useEffect(() => {
        const fetchEventCentres = async () => {
            const { status, data } = await getEventCentres();
            if (status !== 200) {
                console.error('Unable to fetch event centres');
                return;
            }
            setEventCentres(data);
            setFilteredEventCentres(data);
        };
        fetchEventCentres();
    }, []);

    useEffect(() => {
        let results = eventCentres;

        if (filters.searchTerm) {
            results = results.filter((eventCentre) =>
                eventCentre.event_centre_name
                    .toLowerCase()
                    .includes(filters.searchTerm.toLowerCase())
            );
        }

        if (filters.locationFilter) {
            results = results.filter((eventCentre) =>
                eventCentre.state
                    .toLowerCase()
                    .includes(filters.locationFilter.toLowerCase())
            );
        }

        if (filters.priceFilter === 'highest') {
            results.sort(
                (a, b) =>
                    b.event_centre_details?.price -
                    a.event_centre_details?.price
            );
        } else if (filters.priceFilter === 'lowest') {
            results.sort(
                (a, b) =>
                    a.event_centre_details?.price -
                    b.event_centre_details?.price
            );
        }

        setFilteredEventCentres(results);
    }, [filters, eventCentres]);

    const handleFilterChange = (filterName: string, value: string) => {
        setFilters({
            ...filters,
            [filterName]: value,
        });
    };

    return (
        <>
            <UserDashboardLayout>
                <section className="mx-auto overflow-x-hidden w-[95%] sm:w-[90%]">
                    <div className="my-2 sm:my-4 text-center">
                        <p className="font-bold text-[#095A66] text-lg sm:text-xl my-2 sm:my-4">
                            EVENTS
                        </p>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl my-2 sm:my-4 font-bold">
                            Browse all the event centres
                        </h1>
                    </div>
                    <div className="grid md:grid-cols-3 gap-2 md:gap-6 lg:w-[70%] mx-auto">
                        <div className="">
                            <input
                                type="text"
                                value={filters.searchTerm}
                                onChange={(e) =>
                                    handleFilterChange(
                                        'searchTerm',
                                        e.target.value
                                    )
                                }
                                placeholder="Search event centres by state"
                                className="px-4 py-2 border w-full outline-none border-gray-300 rounded-md"
                            />
                        </div>
                        <Select
                            onValueChange={(value) =>
                                handleFilterChange('priceFilter', value)
                            }
                        >
                            <SelectTrigger className="w-full outline-none">
                                <SelectValue placeholder="Sort by price" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="highest">
                                    Highest to Lowest
                                </SelectItem>
                                <SelectItem value="lowest">
                                    Lowest to Highest
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Select
                            onValueChange={(value) =>
                                handleFilterChange('locationFilter', value)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Filter By State" />
                            </SelectTrigger>
                            <SelectContent>
                                {states.map((state: string) => (
                                    <SelectItem key={state} value={state}>
                                        {state}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {filteredEventCentres.length === 0 ? (
                        <div className="text-center my-4">
                            <p className="text-lg sm:text-xl">
                                No event centres available at the moment.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-8 my-8 sm:grid-cols-2 xl:grid-cols-3">
                            {filteredEventCentres.map((eventCentre) => (
                                <EventCard
                                    key={eventCentre.id}
                                    eventCentre={eventCentre}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </UserDashboardLayout>
        </>
    );
};

export default EventCentres;
