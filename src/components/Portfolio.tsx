import React, { useState, useMemo } from 'react';
import { ExternalLink, Github, Search, Layers, Sparkles, Filter } from 'lucide-react';
import Marquee from 'react-fast-marquee';
import CardCarousel from "./ui/card-carousel";

export interface ProjectItem {
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  demoUrl: string;
  codeUrl?: string;
}

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const carouselImages = [
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
      demoUrl: "https://devkhandelwal.me/"
    },
    {
      src: "/pics/image.png",
      alt: "OTB Assessment",
      description: "AI-powered online assessment platform for goal achievement planning",
      demoUrl: "https://otb-wh9e.vercel.app/"
    },
    {
      src: "/pics/event.png",
      alt: "Event Zone",
      description: "An Event website that showcases events in India and allows booking management teams.",
      demoUrl: "https://www.eventzone.co.in/"
    },
    {
      src: "/pics/pardesinaari.png",
      alt: "Pardesinaari",
      description: "A women's clothing e-commerce website with curated styles",
      demoUrl: "https://www.pardesinaari.store/"
    },
    {
      src: "/pics/styledora.png",
      alt: "StyleDora",
      description: "A clothing website for anime lovers focused on custom themes.",
      demoUrl: "https://www.styledora.store/"
    },
    {
      src: "/pics/socialfuse.png",
      alt: "Social Fuse",
      description: "A SaaS app helping creators and brands automate their content.",
      demoUrl: "https://social-fuse.app/"
    },
    {
      src: "/pics/ofm.png",
      alt: "Apsara OFM",
      description: "An agency web platform helping creators scale their digital presence.",
      demoUrl: "https://apsaraofm.vercel.app/"
    },
    {
      src: "/pics/respro.png",
      alt: "Restaurant App",
      description: "Restaurant platform helping users discover and reserve top dining.",
      demoUrl: "https://resptro.vercel.app/"
    },
    {
      src: "/pics/resume.png",
      alt: "Resume Builder",
      description: "A SaaS platform helping users build AI-optimized resumes.",
      demoUrl: "https://resume-mu-rouge-61.vercel.app/"
    },
  ];

  const projects: ProjectItem[] = [
    {
      title: 'Hayman E-Commerce',
      description: 'A modern fullstack e-commerce solution with advanced filtering, payment gateway integration, and real-time inventory management.',
      image: '/pics/hayman.png',
      tags: ['React', 'Node.js', 'MongoDB', 'HTML/CSS'],
      category: 'E-commerce',
      demoUrl: 'https://haymandk.netlify.app',
      codeUrl: 'https://github.com/SDevKh/E-commerce'
    },
    {
      title: 'Blockchain Web Platform',
      description: 'Professional Web3 corporate platform with CMS integration, blog functionality, GSAP animations, and advanced SEO optimization.',
      image: '/pics/blochain.png',
      tags: ['GSAP', 'TypeScript', 'Tailwind', 'Headless CMS'],
      category: 'Web3 & Crypto',
      demoUrl: 'https://blockchaindk.netlify.app',
      codeUrl: 'https://github.com/SDevKh/BlockChain'
    },
    {
      title: 'Pure Fragrance Store',
      description: 'Luxury perfume storefront with user-friendly product recommendations, filterable scent notes, and secure instant checkout.',
      image: '/pics/perfume.png',
      tags: ['JavaScript', 'HTML/CSS', 'PostgreSQL', 'Cloudflare'],
      category: 'E-commerce',
      demoUrl: 'https://purefragnance.in',
      codeUrl: 'https://github.com/SdevKh/perfume'
    },
    {
      title: 'All In AI Directory',
      description: 'Comprehensive directory showcasing trending AI tools with interactive search, live categorization, and analytics dashboard.',
      image: '/pics/allinai.png',
      tags: ['JavaScript', 'GSAP', 'Tailwind', 'Analytics'],
      category: 'AI Tools',
      demoUrl: 'https://allinai.netlify.app',
      codeUrl: 'https://github.com/SdevKh/allinai'
    },
    {
      title: 'OTB Assessment Tool',
      description: 'AI-powered assessment platform featuring tailored questionnaire models that generate personalized goal-achievement roadmaps.',
      image: '/pics/image.png',
      tags: ['Python', 'Streamlit', 'MySQL', 'MongoDB'],
      category: 'AI Tools',
      demoUrl: 'https://otb-wh9e.vercel.app/',
      codeUrl: 'https://github.com/SdevKh/otb'
    },
    {
      title: 'Dev Khandelwal Portfolio',
      description: 'Ultra-fast developer portfolio website crafted with smooth page transitions, interactive 3D gallery, and reactive contact forms.',
      image: '/pics/portfolio.png',
      tags: ['Gatsby', 'Tailwind', 'Netlify', 'React'],
      category: 'Portfolio',
      demoUrl: 'https://devkhandelwal.me/',
      codeUrl: 'https://github.com/SdevKh/portfolio'
    },
    {
      title: 'Social Fuse SaaS',
      description: 'End-to-end creator SaaS application featuring Instagram scheduling automation, smart engagement filters, and growth telemetry.',
      image: '/pics/socialfuse.png',
      tags: ['React', 'Tailwind', 'Python', 'FastAPI'],
      category: 'SaaS',
      demoUrl: 'https://social-fuse.app/',
      codeUrl: 'https://github.com/SdevKh/social-help'
    },
    {
      title: 'Apsara OFM Agency',
      description: 'End-to-end full-service agency platform designed for high-profile creators, featuring client CRM pipelines and media assets.',
      image: '/pics/ofm.png',
      tags: ['Next.js', 'Tailwind', 'Python', 'React'],
      category: 'SaaS',
      demoUrl: 'https://apsaraofm.vercel.app/',
      codeUrl: 'https://github.com/SdevKh/ofm'
    },
    {
      title: 'Respro Restaurant Guide',
      description: 'Curated dining discovery and reservation platform helping foodies explore and book reservations at premier restaurants.',
      image: '/pics/respro.png',
      tags: ['React', 'Tailwind', 'Node.js', 'MongoDB'],
      category: 'Web Apps',
      demoUrl: 'https://resptro.vercel.app/',
      codeUrl: 'https://github.com/SdevKh/resptro'
    },
    {
      title: 'AI Resume Builder',
      description: 'Smart SaaS resume engineering tool using AI prompts to craft ATS-compliant resumes with real-time preview and export.',
      image: '/pics/resume.png',
      tags: ['Next.js', 'OpenAI', 'Tailwind', 'TypeScript'],
      category: 'AI Tools',
      demoUrl: 'https://resume-mu-rouge-61.vercel.app/',
      codeUrl: 'https://github.com/SdevKh/resume'
    },
    {
      title: 'StyleDora Apparel',
      description: 'Anime-inspired streetwear storefront with interactive apparel customizer, responsive shopping bag, and checkout.',
      image: '/pics/styledora.png',
      tags: ['React', 'Tailwind', 'Stripe', 'Node.js'],
      category: 'E-commerce',
      demoUrl: 'https://www.styledora.store/',
      codeUrl: 'https://github.com/SDevKh/styledora'
    },
    {
      title: 'PardesiNaari Couture',
      description: 'Bespoke ethnic fashion e-commerce storefront showcasing authentic artisanal sarees, lehengas, and couture garments.',
      image: '/pics/pardesinaari.png',
      tags: ['React', 'Node.js', 'Express', 'Tailwind'],
      category: 'E-commerce',
      demoUrl: 'https://www.pardesinaari.store/',
      codeUrl: 'https://github.com/SDevKh/pardesinaari'
    },
    {
      title: 'Event Zone India',
      description: 'Comprehensive nationwide event booking and artist discovery platform connecting festival producers with event specialists.',
      image: '/pics/event.png',
      tags: ['React', 'Firebase', 'Tailwind', 'Razorpay'],
      category: 'Web Apps',
      demoUrl: 'https://www.eventzone.co.in/',
      codeUrl: 'https://github.com/SDevKh/event-zone'
    }
  ];

  const categories = useMemo(() => {
    const cats = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
    return cats;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="portfolio" className="relative py-12 md:py-20 bg-neutral-950 text-white min-h-screen">
      {/* Background Ambient Glows */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[70vw] max-w-[800px] h-[400px] bg-blue-600/10 blur-[130px] rounded-full"
      />
      <div
        className="pointer-events-none absolute top-1/2 right-0 w-[40vw] max-w-[500px] h-[500px] bg-purple-600/10 blur-[140px] rounded-full"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-medium uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Works & Case Studies
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight font-sans">
            Our <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Portfolio</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
            Explore our real-world digital products, custom e-commerce stores, SaaS applications, and intelligent AI tools built for clients worldwide.
          </p>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-10 p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm">
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-bold text-white font-mono">13+</span>
              <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider mt-0.5">Live Projects</p>
            </div>
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-bold text-blue-400 font-mono">100%</span>
              <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider mt-0.5">Client Delight</p>
            </div>
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-bold text-indigo-400 font-mono">8+</span>
              <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider mt-0.5">Industries</p>
            </div>
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-bold text-purple-400 font-mono">Full-Stack</span>
              <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider mt-0.5">Architecture</p>
            </div>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const count = cat === 'All' ? projects.length : projects.filter((p) => p.category === cat).length;
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-white/[0.04] text-neutral-300 hover:bg-white/[0.08] hover:text-white border border-white/5'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-neutral-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by title or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-white/[0.02] rounded-2xl border border-white/5">
            <Filter className="w-10 h-10 text-neutral-500 mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-semibold text-white">No projects found</h3>
            <p className="text-sm text-neutral-400 mt-1">Try tweaking your search keyword or selected category tab.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, idx) => (
              <article
                key={idx}
                className="group relative flex flex-col rounded-2xl overflow-hidden bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-blue-500/40 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1.5"
              >
                {/* Project Thumbnail Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900 border-b border-white/5">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium tracking-wide uppercase bg-black/70 backdrop-blur-md text-white/90 border border-white/15">
                      <Layers className="w-3 h-3 text-blue-400" />
                      {project.category}
                    </span>
                  </div>

                  {/* Hover Quick Actions Overlay */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-500 transition-colors"
                        title="Visit Live Project"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.codeUrl && (
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-neutral-800 text-white flex items-center justify-center shadow-lg hover:bg-neutral-700 border border-white/20 transition-colors"
                        title="View Source on GitHub"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-neutral-400 line-clamp-3 font-light leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                    {project.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-2 py-0.5 text-[11px] rounded bg-white/[0.04] text-neutral-300 border border-white/10 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Card Bottom CTA Links */}
                  <div className="mt-5 pt-3 flex items-center justify-between gap-3">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors py-1.5 group/btn"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </a>
                    )}
                    {project.codeUrl && (
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-white transition-colors py-1.5"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Featured Showcase Carousel */}
        <div className="mt-20 md:mt-28 pt-12 border-t border-white/10">
          <div className="text-center mb-8">
            <span className="text-xs font-mono font-medium uppercase tracking-widest text-blue-400">Interactive Preview</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Featured Highlights Carousel</h2>
          </div>
          <div className="overflow-hidden whitespace-nowrap pb-4 scroll-smooth">
            <div className="flex gap-8">
              <CardCarousel
                images={carouselImages}
                autoplayDelay={2200}
                showPagination={true}
                showNavigation={true}
              />
            </div>
          </div>
        </div>

        {/* Brands We Worked With Marquee */}
        <div className="mt-16 md:mt-24 text-center overflow-hidden">
          <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-neutral-400 mb-6">
            Trusted By Innovative Brands & Founders
          </p>
          <div className="relative w-full py-4 overflow-hidden rounded-2xl bg-white/[0.02] border border-white/5">
            <Marquee autoFill={true} loop={0} speed={60} className="flex items-center justify-center space-x-12">
              <div className="flex items-center space-x-12 px-6">
                <img src="/pics/hymn.png" alt="Brand 1" className="h-10 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
                <img src="/pics/ai.png" alt="Brand 2" className="h-10 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
                <img src="/pics/otb.png" alt="Brand 3" className="h-10 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
                <img src="/pics/pure.png" alt="Brand 4" className="h-10 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
                <img src="/pics/block.png" alt="Brand 5" className="h-10 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
                <img src="/pics/Component 2 (1).png" alt="Brand 6" className="h-10 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
                <img src="/pics/logo.png" alt="Brand 7" className="h-10 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
                <img src="/pics/respro.png" alt="Brand 8" className="h-10 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
                <img src="/pics/resume.png" alt="Brand 9" className="h-10 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
              </div>
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
