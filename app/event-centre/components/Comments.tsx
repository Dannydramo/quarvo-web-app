'use client';

import React, { useState, useEffect, useCallback } from 'react';
import CommentForm from './CommentForm';
import { reviewProps } from '@/types/eventTypes';
import { fetchEventCentreReview } from '@/utils/reviewUtils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import StarRating from './StarRating';

const Comments: React.FC<{ eventCentreId: string }> = ({ eventCentreId }) => {
    const [eventCentreReview, setEventCentreReview] = useState<reviewProps[]>(
        []
    );
    const [showReviewForm, setShowReviewForm] = useState(false);
    const toggleReviewForm = () => {
        setShowReviewForm(true);
    };
    const fetchReviews = async () => {
        try {
            const { data, message, status } = await fetchEventCentreReview(
                eventCentreId
            );
            if (status !== 200) {
                console.log(message);
            }

            setEventCentreReview(data.reviews);
        } catch (error) {
            console.log('Unable to fetch event centre review');
        }
    };
    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <>
            <section>
                <h1 className="font-bold text-lg sm:text-xl md:text-2xl mt-8 mb-4 lg:text-4xl">
                    Reviews
                </h1>
                {eventCentreReview.length > 0 ? (
                    <ul className="space-y-4">
                        {eventCentreReview.map((review) => (
                            <div key={review.id}>
                                <div className="flex justify-between my-4 text-sm">
                                    <div className="flex gap-6">
                                        {' '}
                                        <div className="">
                                            <Avatar>
                                                <AvatarFallback>
                                                    {review.full_name[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className="">
                                            <p> {review.full_name}</p>
                                            <p>
                                                {new Date(
                                                    review.created_at
                                                ).toLocaleDateString()}
                                            </p>
                                            <p className="mt-4">
                                                {review.review_comment}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="">
                                        <StarRating rating={review.rating} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </ul>
                ) : (
                    <p>No reviews found.</p>
                )}
                <Button
                    className="mt-4 mb-8 bg-transparent text-black border py-4 px-6 hover:bg-transparent"
                    onClick={toggleReviewForm}
                >
                    Write Review
                </Button>
                {showReviewForm && (
                    <CommentForm
                        eventCentreId={eventCentreId}
                        setShowReviewForm={setShowReviewForm}
                        setReviews={setEventCentreReview}
                    />
                )}
            </section>
        </>
    );
};

export default Comments;
