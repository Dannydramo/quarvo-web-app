import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Choose from './components/Choose';
import Faq from './components/Faq';
import Testimonial from './components/Testimonial';
import Help from './components/Help';

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Choose />
            <Testimonial />
            <Faq />
            <Help />
        </>
    );
};

export default Home;
