import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Award, Clock, Target } from 'lucide-react';
import { ExternalLink, Github } from 'lucide-react';
import Marquee from 'react-fast-marquee';
import CardCarousel from "./ui/card-carousel"
import { describe } from 'node:test';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const images = [
    { 
      src: "/pics/hayman.png", 
      alt: "E-commerce Platform", 
      description: "Modern e-commerce solution with advanced filtering and payment integration",
      demoUrl: "https://haymandk.netlify.app"
    },
    { 
      src: "/pics/blochain.png", 
      alt: "Blockchain Website", 
      description: "Professional corporate website with CMS integration and SEO optimization",
      demoUrl: "https://blockchaindk.netlify.app"
    },
    { 
      src: "/pics/perfume.png", 
      alt: "Perfume Store", 
      description: "Online perfume store with user-friendly interface and secure checkout",
      demoUrl: "https://purefragnance.in"
    },
    { 
      src: "/pics/allinai.png", 
      alt: "All In AI", 
      description: "AI tools showcase with interactive features and user authentication",
      demoUrl: "https://allinai.netlify.app"
    },
    { 
      src: "/pics/portfolio.png", 
      alt: "Portfolio Website", 
      description: "Creative portfolio with smooth animations and gallery functionality",
      demoUrl: "https://devkhandelwal0.netlify.app/"
    },
    { 
      src: "/pics/image.png", 
      alt: "OTB Assessment", 
      description: "AI-powered online assessment platform for goal achievement planning",
      demoUrl: "https://otb-gix1.vercel.app/"
    },
  ];


  const containerRef = useRef<HTMLDivElement>(null);
  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'A modern e-commerce solution with advanced filtering, payment integration, and real-time inventory management.',
      image: '/pics/hayman.png',
      tags: ['React', 'Node.js', 'MongoDB', 'HTML/CSS'],
      category: 'E-commerce',
      demoUrl: 'https://haymandk.netlify.app', // Add this line
      codeUrl: 'https://github.com/SDevKh/E-commerce' // Optional: for code button
    },
    {
      title: 'Bockchain Website',
      description: 'Professional corporate website with CMS integration, blog functionality, and advanced SEO optimization.',
      image: '/pics/blochain.png',
      tags: ['Gsap', 'TypeScript', 'Tailwind', 'Headless CMS'],
      category: 'Project',
      demoUrl: 'https://blockchaindk.netlify.app', // Add this line
      codeUrl: 'https://github.com/SDevKh/BlockChain' // Optional: for code button
    },
    {
      title: 'Purfume Store',
      description: 'A online perfume store with user-friendly interface, product recommendations, and secure checkout.',
      image: '/pics/perfume.png',
      tags: ['Javascript', 'HTML/CSS', 'PostgreSQL', 'Coludfare'],
      category: 'Website',
      demoUrl: 'https://purefragnance.in', // Add this line
      codeUrl: 'https://github.com/SdevKh/perfume' // Optional: for code button
    },
    {
      title: 'All In AI',
      description: 'A website showcasing AI tools and resources with interactive features, user authentication, and analytics.',
      image: '/pics/allinai.png',
      tags: ['js', 'GSAP', 'HTML/CSS', 'Analytics'],
      category: 'Tool',
      demoUrl: 'https://allinai.netlify.app', // Add this line
      codeUrl: 'https://github.com/SdevKh/allinai' // Optional: for code button
    },
    {
      title: 'OTB(online assement test for users',
      description: 'An ai powered online platoform with some simple questions about yourself and get the best plan to achive your goals.',
      image: '/pics/image.png',
      tags: ['Python', 'Stremlits', 'MySQL', 'MongoDB'],
      category: 'AI Tool',
      demoUrl: 'https://otb-wh9e.vercel.app/', // Add this line
      codeUrl: 'https://github.com/SdevKh/otb' // Optional: for code button
    },
    {
      title: 'Portfolio Website',
      description: 'Creative portfolio website with smooth animations, gallery functionality, and contact forms.',
      image: '/pics/portfolio.png',
      tags: ['Gatsby', 'Tailwind', 'Netlify', 'React'],
      category: 'Portfolio',
      demoUrl: 'https://devkhandelwal0.netlify.app/', // Add this line
      codeUrl: 'https://github.com/SdevKh/portfolio'
    }
  ];

  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.portfolio-card');
    console.log('Portfolio cards count:', cards.length);
    if (cards.length === 0) return;
    gsap.from(cards, {
      duration: 1,
      scale: 0,
      y: 40,
      stagger: 0.01,
      scrollTrigger: {
        trigger: ".portfolio",
        start: "top bottom",
      }
    });
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        try {
          trigger.kill();
        } catch (e) {
          console.error('Error killing ScrollTrigger:', e);
        }
      });
    };
  }, []);

   return (
    <section id="portfolio" className="py-20 ">
      <div className="border-none absolute ml-[-50vh] mt-[50vh] left-1/2 -translate-x-1/2 w-[30vw] h-[30rem] bg-[#1E3A8A] rounded-[50%] p-8 pointer-events-none hidden md:block" style={{ boxShadow: 'white 0 0 17px -2px inset' }}></div>
      <div className="border-none absolute ml-[50vh] mt-[0] left-1/2 -translate-x-1/2 w-[30vw] h-[30rem] overflow-hidden bg-[#1E3A8A] rounded-[50%] p-8 pointer-events-none hidden md:block" style={{ boxShadow: 'white 0 0 17px -2px inset' }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#374151] font-keania mb-6">
            Our <span className=" text-blue-400">Portfolio</span>
          </h2>
          <p className="text-xl text-[#374151] font-keania max-w-3xl mx-auto">
            Discover some of our recent projects and see how we've helped businesses achieve their digital goals
          </p>
        </div>


<div 
  className="overflow-hidden whitespace-nowrap pb-4 scroll-smooth">
  <div className="flex gap-8">
    <CardCarousel
            images={images}
            autoplayDelay={2000}
            showPagination={true}
            showNavigation={true}

          />
      </div>
    </div>
</div>
      
    <div className='roatating-brands mt-[10vh] text-center overflow-hidden'>
        <p className='text-[7vw] m-[7vh] text-[#374151] font-keania'>Brands We Worked</p>
        <div className="relative w-full h-20 overflow-hidden">
          <Marquee autoFill={true} loop={0} speed={100}  className="flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-8">
              <img src="/pics/hymn.png" alt="Brand 1" className="h-12" />
              <img src="/pics/ai.png" alt="Brand 2" className="h-12" />
              <img src="/pics/otb.png" alt="Brand 3" className="h-12" />
              <img src="/pics/pure.png" alt="Brand 4" className="h-12" />
              <img src="/pics/block.png" alt="Brand 5" className="h-12" />
            </div>
          </Marquee>
          
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
