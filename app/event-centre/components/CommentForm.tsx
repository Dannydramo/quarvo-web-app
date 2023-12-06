'use client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { UserStore } from '@/store/userInfo'
import { fetchEventCentreReview } from '@/utils/reviewUtils'
import React, { FormEvent, useState } from 'react'

const CommentForm = ({ eventCentreId }: { eventCentreId: string }) => {
    const { userDetails } = UserStore()
    const [loading, setLoading] = useState(false)
    const [comment, setComment] = useState('')
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true)
            const res = await fetch('/api/post-review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    eventCentreId: eventCentreId,
                    comment: comment,
                    userFullName: userDetails?.full_name,
                }),
            });

            const data = await res.json()
            setLoading(false)
            setComment('')
            fetchEventCentreReview(eventCentreId)
        } catch (error) {
            console.error('Error:', error);
            setLoading(false)
            return
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Textarea placeholder="Comment your review" value={comment} onChange={(e) => { setComment(e.target.value) }} className="outline-none mb-4 mt-4 border h-[200px]" />
                <Button type='submit' disabled={loading} className='bg-[#856D47] hover:bg-[#856D47] mb-8 text-white'>{loading ? 'Submitting Review' : 'Submit Review'}</Button>
            </form>
        </>
    )
}

export default CommentForm