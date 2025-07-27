
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Award, Clock, Target } from 'lucide-react';
import { ExternalLink, Github } from 'lucide-react';
import Marquee from 'react-fast-marquee';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const containerRef = useRef<HTMLDivElement>(null);
   const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = 350; // pixels to scroll, adjust as needed
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };
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
      demoUrl: 'https://devkhandelwal0.netfliy.app/', // Add this line
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className=" text-blue-400">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover some of our recent projects and see how we've helped businesses achieve their digital goals
          </p>
        </div>

  <div className='relative'>
    <button
      onClick={() => scroll('left')}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-slate-800/80 text-white rounded-full p-2 shadow hover:bg-blue-600 transition"
      aria-label="Scroll Left">
        &#8592;
      </button>
      <button
      onClick={() => scroll('right')}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-slate-800/80 text-white rounded-full p-2 shadow hover:bg-blue-600 transition"
      aria-label="Scroll Right">
        &#8594;
      </button>
<div 
  ref={scrollRef}
  className="overflow-hidden whitespace-nowrap pb-4 scroll-smooth">
  <div className="flex gap-8">
    {projects.map((project, index) => (
      <div
        key={index}
        className=" min-w-[340px] max-w-xs portfolio-card group bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-transform duration-300 hover:scale-105"
      >
        <div className="relative overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
          <div className="absolute top-4 right-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {project.category}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
          <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="bg-slate-700 text-gray-300 px-2 py-1 rounded-lg text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex space-x-4">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ExternalLink size={16} className="mr-1" />
              <span className="text-sm">Live Demo</span>
            </a>
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-400 hover:text-gray-300 transition-colors"
            >
              <Github size={16} className="mr-1" />
              <span className="text-sm">Code</span>
               </a>
             </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
      
    <div className='roatating-brands mt-10 text-center overflow-hidden'>
        <p className='text-[7vw] m-[7vh] text-[white]'>Brands We Worked</p>
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
      

      </div>
    </section>
  );
};

export default Portfolio;
