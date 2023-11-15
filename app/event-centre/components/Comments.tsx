import React from 'react';
import CommentForm from './CommentForm';
import { reviewProps } from '@/types/eventTypes';

const Comments: React.FC<{ eventCentreReview: reviewProps[], eventCentreId: string }> = ({ eventCentreReview, eventCentreId }) => {
    return (
        <>
            <section className='mx-auto overflow-x-hidden w-[95%] sm:w-[90%]'>
                <div className='mb-4 text-lg font-bold'>Comments</div>
                {eventCentreReview.length > 0 ? (
                    <ul className='space-y-4'>
                        {eventCentreReview.map((review) => (
                            <li key={review.id} className='flex flex-col'>
                                <div className='font-bold'>{review.full_name}</div>
                                <div className='text-gray-600'>{review.review_comment}</div>
                                <div className='text-xs text-gray-500'>
                                    {new Date(review.created_at).toLocaleDateString()}
                                </div>
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
