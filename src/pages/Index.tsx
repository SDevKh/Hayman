
import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Swotland from "../components/Swotland.tsx";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#FAF0E6]">
      <Navigation />
      <Hero />
      <Services />
      <Swotland />
      <About />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
