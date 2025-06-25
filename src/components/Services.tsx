import React, { useRef, useEffect } from "react";
import { Globe, ShoppingCart, Smartphone, Database, Zap, Shield } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
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
      icon: Database,
      title: 'Backend Development',
      description: 'Robust server-side solutions with databases, APIs, and cloud integration.',
      features: ['API Development', 'Database Design', 'Cloud Integration']
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
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
    // Clear previous refs
    cardRefs.current = cardRefs.current.slice(0, services.length);

    // Wait for next tick to ensure DOM is ready
    const timer = setTimeout(() => {
      // Filter out null refs
      const validCards = cardRefs.current.filter(card => card !== null);
      
      if (validCards.length === 0) return;

      // Create timeline for better control
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          onRefresh: () => {
            // Refresh when scroll trigger updates
            ScrollTrigger.refresh();
          }
        }
      });

      // Animate each card with stagger
      validCards.forEach((card, index) => {
        if (card) {
          // Set initial state
          gsap.set(card, {
            y: 80,
            opacity: 0,
            scale: 0.8,
            rotationY: index % 2 === 0 ? -15 : 15
          });

          // Add to timeline with stagger
          tl.to(card, {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 0.8,
            ease: "power3.out",
          }, index * 0.15);
        }
      });

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      // Kill all ScrollTriggers for this component
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [services.length]);

  // Function to set card ref
  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    cardRefs.current[index] = el;
  };

  return (
    <section id="services" className="py-20 min-h-screen overflow-visible relative" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-blue-400">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We offer comprehensive web development services to help your business thrive in the digital landscape
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => setCardRef(el, index)}
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