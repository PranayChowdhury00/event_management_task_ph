import React from 'react';
import HeroBanner from '../../components/Home/HeroBanner';
import FeaturedEvents from '../../components/Home/FeaturedEvents';
import HowItWorks from '../../components/Home/HowItWorks';
import StatsSection from '../../components/Home/StatsSection';
import Testimonials from '../../components/Home/Testimonials';
import CallToAction from '../../components/Home/CallToAction';

const Home = () => {
 return (
  <div>
   <HeroBanner></HeroBanner>
   <FeaturedEvents></FeaturedEvents>
   <HowItWorks></HowItWorks>
   <StatsSection></StatsSection>
   <Testimonials></Testimonials>
   <CallToAction></CallToAction>
  </div>
 );
};

export default Home;