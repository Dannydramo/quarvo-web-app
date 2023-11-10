import React from 'react'
import CommentForm from './CommentForm'

const Comments = () => {
    return (
        <>
            <section className='mx-auto overflow-x-hidden w-[95%] sm:w-[90%]'>
                <div>Comments</div>
                <CommentForm />
            </section>
        </>
    )
}

export default Comments