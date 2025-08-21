import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, TrendingUp, Route, Globe } from 'lucide-react';
import WrapButton from "./ui/wrap-button"

gsap.registerPlugin(ScrollTrigger);

const Swotland = () => {
  const circleRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

useEffect(() => {
    circleRefs.forEach((ref, i) => {
      if (ref.current) {
        gsap.to(ref.current, {
          rotation: 360,
          repeat: -1,
          duration: 10 + i * 2, // different speed for each
          ease: "linear",
          transformOrigin: "50% 50%",
        });
      }
    });
  }, []);

  return (
    <section className="bg-[#FAF0E6] text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 justify-items-center">
        <h2 className="text-3xl text-[#374151] font-keania font-bold mb-6">Swot AI</h2>
        <h3 className="text-xl text-[#374151] font-semibold mb-4">An ai analysis of your business path</h3>
        <p className="text-[#374151] mb-8">
         Grow your brand in this AI era, Get the best insights and analysis of your business path with Swot AI.
        </p>
            <div className="absolute ml-[-100vh] mt-[-27vh] left-1/2 -translate-x-1/2 w-[70vw] h-[62rem]  rounded-[50%] p-8 pointer-events-none" style={{ boxShadow: 'inset -6px 0px 0 -2px black' }}></div>
            <div
              ref={circleRefs[0]}
              className="absolute ml-[-60vh] text-[3vw] mt-[-26vh] left-1/2 -translate-x-1/2 w-[15vw] h-[15rem] bg-[#1E3A8A] rounded-[50%] p-8 pointer-events-none flex items-center justify-center"
              style={{ boxShadow: 'inset 0 8px 22px 0 white' }}
              >            
              START
              </div>
              <div
              ref={circleRefs[1]}
              className="absolute ml-[-40vh] text-[3vw] mt-[5vh] left-1/2 -translate-x-1/2 w-[20vw] h-[20rem] bg-[#1E3A8A] rounded-[50%] p-8 pointer-events-none flex items-center justify-center"
              style={{ boxShadow: 'inset 0 8px 22px 0 white' }}
              >            
              BUILD
             </div>
              <div
              ref={circleRefs[2]}
              className="absolute ml-[-55vh] text-[3vw] mt-[50vh] left-1/2 -translate-x-1/2 w-[15vw] h-[15rem] bg-[#1E3A8A] rounded-[50%] p-8 pointer-events-none flex items-center justify-center"
              style={{ boxShadow: 'inset 0 8px 22px 0 white' }}
              >            
              GROW
            </div>
        <div className="float-right space-y-8">
          <div className="w-[30vw] p-8 rounded-[30px] shadow-lg flex flex-col items-center text-center gap-y-4"
            style={{
                background: 'linear-gradient(to right, #513F32 50%, #E2D487 50%)'
              }}
            >
            <Activity size={44} className="text-blue-400" />
            <h4 className="text-xl font-semibold">AI-Predictive analytics</h4>
            <p className="text-gray-400">
              Leverage AI to gain deep insights into your business performance and market trends.
            </p>
          </div>
          <div className="w-[30vw] p-8 rounded-[30px] shadow-lg flex flex-col items-center text-center gap-y-4"
            style={{
                background: 'linear-gradient(to right, #513F32 50%, #E2D487 50%)'
              }}
            >
            <TrendingUp size={44} className="text-blue-400" />
            <h4 className="text-xl font-semibold">Data-Driven Decisions</h4>
            <p className="text-gray-400">
              Make informed decisions with data analytics and AI-driven recommendations.
            </p>
          </div>
          <div className="w-[30vw] p-8 rounded-[30px] shadow-lg flex flex-col items-center text-center gap-y-4"
            style={{
                background: 'linear-gradient(to right, #513F32 50%, #E2D487 50%)'
              }}
            >
            <Route size={44} className="text-blue-400" />
            <h4 className="text-xl font-semibold">Optimized growth path</h4>
            <p className="text-gray-400">
              Get a clear roadmap for your business growth with AI insights.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <a href='/swot.tsx'>
        <WrapButton className="mt-10" href="swot">
          <Globe className="animate-spin" />
          Get started
        </WrapButton>
        </a>
      </div>
    </section>
  );
};

export default Swotland;