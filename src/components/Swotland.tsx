import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, TrendingUp, Route, Globe } from 'lucide-react';
import WrapButton from "./ui/wrap-button"

gsap.registerPlugin(ScrollTrigger);

const Swotland = () => {

  return (
    <section className="bg-[linear-gradient(#0D0D0D,#5F4B8B,#0D0D0D)] text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 justify-items-center">
        <h2 className="text-3xl font-bold mb-6">Swot AI</h2>
        <h3 className="text-xl font-semibold mb-4">An ai analysis of your business path</h3>
        <p className="text-gray-300 mb-8">
         Grow your brand in this AI era, Get the best insights and analysis of your business path with Swot AI.
        </p>
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-8 rounded-[30px] shadow-lg flex flex-col items-center text-center gap-y-4">
            <Activity size={44} className="text-blue-400" />
            <h4 className="text-xl font-semibold">AI-Predictive analytics</h4>
            <p className="text-gray-400">
              Leverage AI to gain deep insights into your business performance and market trends.
            </p>
          </div>
          <div className="bg-gray-800 p-8 rounded-[30px] shadow-lg flex flex-col items-center text-center gap-y-4">
            <TrendingUp size={44} className="text-blue-400" />
            <h4 className="text-xl font-semibold">Data-Driven Decisions</h4>
            <p className="text-gray-400">
              Make informed decisions with data analytics and AI-driven recommendations.
            </p>
          </div>
          <div className="bg-gray-800 p-8 rounded-[30px] shadow-lg flex flex-col items-center text-center gap-y-4">
            <Route size={44} className="text-blue-400" />
            <h4 className="text-xl font-semibold">Optimized growth path</h4>
            <p className="text-gray-400">
              Get a clear roadmap for your business growth with AI insights.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <WrapButton className="mt-10" href="swot">
          <Globe className="animate-spin" />
          Get started
        </WrapButton>
      </div>
    </section>
  );
};

export default Swotland;
