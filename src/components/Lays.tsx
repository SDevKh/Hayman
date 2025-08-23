import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, TrendingUp, Route, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Lays = () => {
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
    <section className="bg-[#FAF0E6] text-white py-10">
        <div className=''>
            <h1 className="text-7xl mb-8 text-center font-keania font-black text-[#374151]">LAY's</h1>
        </div>
    <div className="flex md:space-x-20 space-x-4 justify-center items-center py-10">
    <div className="w-[340px] h-[237px] md:h-[600px] rounded-[30px] shadow-lg flex items-center justify-center overflow-hidden bg-white">
    <img src="/pics/lay1.webp" alt="Description 1" className="w-full h-full object-cover rounded-[30px]" />
    </div>
    <div className="w-[340px] h-[237px] md:h-[600px] rounded-[30px] shadow-lg flex items-center justify-center overflow-hidden bg-white">
    <img src="/pics/lay2.jpg" alt="Description 2" className="w-full h-full object-cover rounded-[30px]" />
    </div>
    <div className="w-[340px] h-[237px] md:h-[600px] rounded-[30px] shadow-lg flex items-center justify-center overflow-hidden bg-white">
    <img src="/pics/lay3.jpg" alt="Description 3" className="w-full h-full object-cover rounded-[30px]" />
    </div>
    </div>

    <div className="flex md:space-x-20 space-x-4 justify-center items-center py-10">
    <div className="w-[340px] h-[237px] md:h-[600px] rounded-[30px] shadow-lg flex items-center justify-center overflow-hidden bg-white">
    <img src="/pics/lay4.jpg" alt="Description 1" className="w-full h-full object-cover rounded-[30px]" />
    </div>
    <div className="w-[340px] h-[237px] md:h-[600px] rounded-[30px] shadow-lg flex items-center justify-center overflow-hidden bg-white">
    <img src="/pics/lay5.jpg" alt="Description 2" className="w-full h-full object-cover rounded-[30px]" />
    </div>
    <div className="w-[340px] h-[237px] md:h-[600px] rounded-[30px] shadow-lg flex items-center justify-center overflow-hidden bg-white">
    <img src="/pics/lay6.jpg" alt="Description 3" className="w-full h-full object-cover rounded-[30px]" />
    </div>
    </div>
    </section>
  );
};

export default Lays;
