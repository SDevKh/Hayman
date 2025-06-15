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
    <section id="about" className="py-20 relative overflow-visible">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About <span className="text-blue-400">HAYMAN</span>
            </h2>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                At HAYMAN, we're passionate about creating digital experiences that not only look 
                stunning but also drive real business results. Our team of expert developers and 
                designers work closely with clients to understand their unique needs and deliver 
                tailored solutions.
              </p>
              <p>
                We specialize in modern web technologies and follow industry best practices to 
                ensure your project is scalable, secure, and performant. From concept to deployment, 
                we're with you every step of the way.
              </p>
              <p>
                Our commitment to excellence and attention to detail has earned us the trust of 
                businesses ranging from startups to enterprise companies across various industries.
              </p>
            </div>
            <div className="mt-8">
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-medium text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Let's Work Together
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 text-center hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-blue-400 mb-4 flex justify-center">
                  <stat.icon size={48} />
                </div>
                <div
                  ref={el => numberRefs.current[index] = el}
                  className="text-3xl font-bold text-white mb-2"
                >
                  0{stat.suffix}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;