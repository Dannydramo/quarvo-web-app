import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Choose from './components/Choose';
import Faq from './components/Faq';
import Testimonial from './components/Testimonial';

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Choose />
            <Testimonial />
            <Faq />
        </>
    );
};

export default Home;
