import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Award, Clock, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const stats = [
    { icon: Users, number: 50, label: 'Happy Clients', suffix: '+' },
    { icon: Award, number: 100, label: 'Projects Completed', suffix: '+' },
    { icon: Clock, number: 5, label: 'Years Experience', suffix: '+' },
    { icon: Target, number: 99, label: 'Success Rate', suffix: '%' }
  ];

  // Refs for each number element
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    numberRefs.current.forEach((el, i) => {
      if (!el) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: stats[i].number,
        duration: 3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reverse",
          once: true
        },
        onUpdate: () => {
          el.textContent = Math.floor(obj.val).toString() + stats[i].suffix;
        }
      });
    });
    // Cleanup triggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  numberRefs.current = [];

  return (
    <section id="about" className="py-20 relative bg-[#FAF0E6] overflow-hidden">
      {/* Background Elements */}
      <div className="border-none absolute ml-[-80vh] mt-[-30vh] left-1/2 -translate-x-1/2 w-[50vw] h-[50rem] bg-[#1E3A8A] rounded-[50%] p-8 pointer-events-none hidden md:block" style={{ boxShadow: 'white 0 0 17px -2px inset' }}></div>
      <div className="border-none absolute ml-[70vh] mt-[30vh] left-1/2 -translate-x-1/2 w-[50vw] h-[50rem] overflow-hidden bg-[#1E3A8A] rounded-[50%] p-8 pointer-events-none hidden md:block" style={{ boxShadow: 'white 0 0 17px -2px inset' }}></div>
      <h2 className="text-4xl md:text-5xl font-bold justify-self-center text-[#374151] mb-6">
          About <span className="text-blue-400 font-keania">HAYMAN</span>
      </h2>
      <div className="p-[5vw] rounded-[5vw] w-[80%] justify-self-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 bg-[#C5FF34]" style={{ boxShadow: 'black 11px 7px 20px -4px inset' }}>
        <div className="gap-16 items-center">
          <div className="space-y-6 font-keania font-black text-[#374151] text-[2.2vw] leading-relaxed text-center mb-12">
          <p>
            At HAYMAN, we're passionate about creating digital experiences that not only look 
            stunning but also drive real business results. 
          </p>
      </div>
          <div>
          </div>
          <div className="flex gap-6 justify-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white w-[15vw]  rounded-2xl p-8 text-center hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1" style={{ boxShadow: 'black 7px 10px 19px 1px inset' }}
              >
                <div className="text-blue-400 mb-4 flex ">
                  <stat.icon size={48} />
                </div>
                <div
                  ref={el => numberRefs.current[index] = el}
                  className="text-3xl font-bold text-[#374151] mb-2"
                >
                  0{stat.suffix}
                </div>
                <div className="text-[#374151]">{stat.label}</div>
              </div>
              
            ))}
            
          </div>
          
        </div>
        
      </div>
        <div className="justify-center flex mb-8 relative z-20 mt-[-3vh]">
    <button 
      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
      className="bg-[#F97316] text-white px-8 py-4 rounded-full font-medium text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" style={{ boxShadow: 'black -16px -10px 9px -3px' }}
    >
      Let's Work Together
    </button>
  </div>
    </section>
  );
};

export default About;