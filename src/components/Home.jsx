import React from 'react';

import LatestProducts from './common/LatestProducts';
import FeaturedProducts from './common/FeaturedProducts';
import Header from './common/Header';
import Footer from './common/Footer';
import Hero from './common/Hero';
import Layouts from './common/Layouts';




const Home = () => {
    return (
        <div>
            <Layouts>
                <Hero />
                <LatestProducts />
                <FeaturedProducts />
            </Layouts>

            


            
        </div>
    );
};

export default Home;