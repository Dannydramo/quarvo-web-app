'use client'

import React, { useState, useEffect, useCallback } from 'react';
import CommentForm from './CommentForm';
import { reviewProps } from '@/types/eventTypes';
import { fetchEventCentreReview } from '@/utils/reviewUtils';

const Comments: React.FC<{ eventCentreId: string }> = ({ eventCentreId }) => {

    const [eventCentreReview, setEventCentreReview] = useState<reviewProps[]>([])

    const fetchReviews = useCallback(async () => {
        try {

            const { data, message, status } = await fetchEventCentreReview(eventCentreId)
            if (status !== 200) {
                console.log(message);
            }
            setEventCentreReview(data.reviews)
        } catch (error) {
            console.log('Unable to fetch event centre review');
        }
    }, [])

    useEffect(() => {
        fetchReviews()
    }, [fetchReviews])

    return (
        <>
            <section>
                <h1 className='font-bold text-lg sm:text-xl md:text-2xl mt-8 mb-4 lg:text-4xl'>Reviews</h1>
                {eventCentreReview.length > 0 ? (
                    <ul className='space-y-4'>
                        {eventCentreReview?.map((review) => (
                            <li key={review.id}>
                                <div className='flex items-start justify-between'>
                                    <div className='font-bold text-base'>{review.full_name}</div>
                                    <div className='text-xs text-gray-500'>
                                        {new Date(review.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className='text-gray-600 text-sm mt-2'>{review.review_comment}</div>
                                <hr className='my-4 border-t border-gray-300' />
                            </li>
                        ))}
                    </ul>

                ) : (
                    <p>No reviews found.</p>
                )}
                <CommentForm eventCentreId={eventCentreId} />
            </section>
        </>
    );
};

export default Comments;
