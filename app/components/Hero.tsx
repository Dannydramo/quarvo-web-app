import Image from 'next/image';
import React from 'react';

const Hero = () => {
    return (
        <section className=''>
            <div className="flex w-[95%] sm:w-[90%] mx-auto max-w-[1800px] justify-between py-6 items-center">
               <div className="">
                {/* <Image src={'/hero_bg.jpg'} alt='hro_img' priority width={600} height={600}/> */}
               </div>
            </div>
        </section>
    );
};

export default Hero;
