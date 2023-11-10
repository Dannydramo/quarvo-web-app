import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const CommentForm = () => {
    return (
        <>
            <form>

                <Textarea placeholder="Comment your review" className="outline-none border h-[200px]" />

                <Button type='submit'>Submit Review</Button>
            </form>
        </>
    )
}

export default CommentForm