import React, { useRef, useEffect } from "react";
import { Globe, ShoppingCart, Smartphone, Database, Zap, Shield, Handshake, Palette } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const services = [
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies and best practices.',
      features: ['React & Next.js', 'Performance Optimized', 'SEO Friendly']
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce Solutions',
      description: 'Complete online stores with payment integration, inventory management, and analytics.',
      features: ['Payment Integration', 'Inventory Management', 'Analytics Dashboard']
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      description: 'Responsive designs that work perfectly across all devices and screen sizes.',
      features: ['Responsive Design', 'Touch Optimized', 'Fast Loading']
    },
    {
      icon: Handshake,
      title: 'Social Media Marketing',
      description: 'Robust server-side solutions with databases, APIs, and cloud integration.',
      features: ['API Development', 'Database Design', 'Cloud Integration']
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Lightning-fast websites optimized for speed, SEO, and user experience.',
      features: ['Speed Optimization', 'SEO Enhancement', 'Core Web Vitals']
    },
    {
      icon: Shield,
      title: 'Security & Maintenance',
      description: 'Comprehensive security measures and ongoing maintenance for peace of mind.',
      features: ['Security Audits', 'Regular Updates', '24/7 Monitoring']
    }
  ];

  useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  const ctx = gsap.context(() => {
    gsap.from(".card", {
      opacity: 0,
      y: 500,
      duration: 1.8,
      ease: "power2.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: "#services",
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });
  });

  return () => ctx.revert();
}, []);
  // Reset refs on each render
  cardRefs.current = [];

  return (
    <section id="services" className="py-20 min-h-screen overflow-visible relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-blue-400">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We offer comprehensive web development services to help your business thrive in the digital landscape
          </p>
        </div>

        <div className="service-card card group grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={el => cardRefs.current[index] = el}
              className="service-card group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon size={48} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-gray-400 flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
