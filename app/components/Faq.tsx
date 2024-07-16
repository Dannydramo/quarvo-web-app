'use client';
import React, { useState } from 'react';
interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: 'How do I book an event centre?',
        answer: 'You can book an event centre by browsing our listings, selecting your preferred venue, and filling out the booking form with your details. Our team will confirm your booking and provide further instructions.',
    },
    {
        question: 'What types of events can I host?',
        answer: 'Our event centres cater to various events, including weddings, corporate events, birthday parties, conferences, and more. Each listing provides specific details about the types of events the venue can accommodate.',
    },
    {
        question: ' Are there any additional fees?',
        answer: 'Some venues may have additional fees for services such as catering, decoration, or cleaning. These fees will be clearly listed on the venues page.',
    },
    {
        question: ' Can I visit the venue before booking?',
        answer: 'Yes, we encourage you to visit the venue before making a booking. You can contact us to schedule a visit at your convenience.',
    },
    {
        question: 'What is the cancellation policy?',
        answer: 'The cancellation policy varies by venue. Please refer to the specific venues page for detailed information on their cancellation policy.',
    },
];
const Faq = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            {faqData.map((item, index) => (
                <div
                    key={index}
                    className={`border-b p-4 rounded-md ${
                        openIndex === index ? 'bg-[#E7ECF2]' : 'bg-transparent'
                    }`}
                >
                    <button
                        className="text-sm text-start md:text-base lg:text-lg w-full flex flex-1 items-center justify-between py-4 font-medium outline-none transition-all"
                        onClick={() => toggleFAQ(index)}
                    >
                        <span>{item.question}</span>
                        <span>
                            {openIndex !== index ? (
                                <>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-4 w-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                        />
                                    </svg>
                                </>
                            ) : (
                                <>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-4 w-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m4.5 15.75 7.5-7.5 7.5 7.5"
                                        />
                                    </svg>
                                </>
                            )}
                        </span>
                    </button>
                    {openIndex === index && (
                        <div className="text-base md:text-lg my-4">
                            {item.answer}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Faq;
