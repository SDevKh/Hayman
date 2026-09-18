
import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Swotland from "../components/Swotland.tsx";
import ReelFluxLanding from '../components/ReelFlux/ReelFluxLanding';
import RotatingScrollGallery from '../components/RotatingScroll/RotatingScrollGallery';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#FAF0E6]">
      <Navigation />
      <Hero />
      <ReelFluxLanding />
      <Services />
      <Swotland />
      <About />
      <RotatingScrollGallery />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
