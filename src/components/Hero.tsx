import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ArrowRight, Code, Scale, Sparkles } from 'lucide-react';

const Hero = () => {
  const gradientTextRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (gradientTextRef.current) {
      gsap.fromTo(
        gradientTextRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, delay: 0.5, ease: "power3.out", scale: 1.2,}
      );
    }
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <img src="/pics/3d.png" alt="Background" className="absolute md:mt-[20vh] md:mr-[74vw] mr-[70vw] w-32 md:w-64 mt-[50vh] " />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="text-blue-400 mr-2" size={24} />
            <span className="text-blue-400 font-medium">Premium Web Development</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            We Build
            <span
              ref={gradientTextRef}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
            >
              Digital Experiences
            </span>
            That Convert
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            HAYMAN crafts exceptional web applications, e-commerce solutions, and digital platforms 
            that drive business growth and deliver outstanding user experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-medium text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Your Project
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            
            <button 
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="group text-white border-2 border-white/20 px-8 py-4 rounded-full font-medium text-lg hover:border-blue-400 hover:text-blue-400 transition-all duration-300 flex items-center backdrop-blur-sm"
            >
              <Code className="mr-2" size={20} />
              View Our Work
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
