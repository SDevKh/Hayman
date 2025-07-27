
import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0c0512] to-slate-900">
      <Navigation />
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
