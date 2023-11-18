'use client'

import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import { reviewProps } from '@/types/eventTypes';
import { fetchEventCentreReview } from '@/utils/reviewUtils';

const Comments: React.FC<{ eventCentreId: string }> = ({ eventCentreId }) => {

    const [eventCentreReview, setEventCentreReview] = useState<reviewProps[]>([])

    useEffect(() => {

        const fetchReviews = async () => {
            try {

                const { data, message, status } = await fetchEventCentreReview(eventCentreId)
                if (status !== 200) {
                    console.log(message);
                }
                setEventCentreReview(data)
            } catch (error) {
                console.log('Unable to fetch event centre review');
            }
        }
        fetchReviews()
    }, [eventCentreReview])

    return (
        <>
            <section>
                <div className='mb-4 mt-4 text-lg font-bold'>Comments</div>
                {eventCentreReview?.length > 0 ? (
                    <ul className='space-y-4'>
                        {eventCentreReview.map((review) => (
                            <li key={review.id} className='flex flex-col'>
                                <div className='font-bold'>{review.full_name}</div>
                                <div className='text-gray-600 mt-1'>{review.review_comment}</div>
                                <div className='text-xs text-gray-500 mt-1'>
                                    {new Date(review.created_at).toLocaleDateString()}
                                </div>
                                <hr />
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
