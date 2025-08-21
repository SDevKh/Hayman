import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import Swiper from 'swiper';
import 'swiper/css';
import { ArrowRight, Code, Scale, Sparkles } from 'lucide-react';

const Hero = () => {
  const gradientTextRef = useRef<HTMLSpanElement | null>(null);
  
  function cursoreffect() {
    var page1content = document.querySelector('#home');
    var cursor = document.querySelector('.cursor');

    page1content?.addEventListener('mousemove', function(dets) {
      gsap.to(cursor, {
        x: dets.x,
        y: dets.y
      })
    })
      page1content?.addEventListener('mouseenter', function () {
      gsap.to(cursor, {
        scale: 1,
        opacity: 1
      })
    })
      page1content?.addEventListener('mouseleave', function () {
      gsap.to(cursor, {
        scale: 0,
        opacity: 0
      })
  })
}
  cursoreffect();

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
    <section id="home" className="min-h-[77vh] md:min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute mt-[-100vh] left-1/2 -translate-x-1/2 w-[103vw] h-[43rem] bg-[#1E3A8A] rounded-[50%] p-8 pointer-events-none" style={{ boxShadow: 'inset 0 8px 32px 0 white' }}></div>
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
          
          <h1 className="text-52vw] md:text-[2vw] font-bold text-white mb-6 leading-tight">
            We Build brands not just websites,
            <span
              ref={gradientTextRef}
              className="block text-[12vw] font-keania tracking-[1.8vw] text-transparent bg-clip-text bg-[#374151]"
            >
              HAYMAN
            </span>
            </h1>
          <h1 className="text-[3vw] md:text-[2vw] font-semibold text-[#374151] mb-8 w-[98%]">
            Build your online presence for not only your customers but also for your company
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-[#F97316] text-white px-8 py-4 rounded-full font-medium text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Your Project
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            
            <button 
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="group text-[#374151] border-2 border-[#374151]/20 px-8 py-4 rounded-full font-medium text-lg hover:border-blue-400 hover:text-blue-400 transition-all duration-300 flex items-center backdrop-blur-sm"
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
