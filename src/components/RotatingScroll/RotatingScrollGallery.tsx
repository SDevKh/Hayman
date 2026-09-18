import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import styles from "./RotatingScrollGallery.module.css";

gsap.registerPlugin(ScrollTrigger);

interface PortfolioProject {
  title: string;
  category: string;
  description: string;
  image: string;
  demoUrl: string;
}

const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    title: "Hayman E-Commerce",
    category: "Full-Stack Web App",
    description: "Modern e-commerce platform with advanced product filtering, responsive UI, and secure payments.",
    image: "/pics/hayman.png",
    demoUrl: "https://haymandk.netlify.app",
  },
  {
    title: "Blockchain Corporate",
    category: "Web3 & Corporate",
    description: "Professional enterprise website with headless CMS integration, dark aesthetics, and SEO optimization.",
    image: "/pics/blochain.png",
    demoUrl: "https://blockchaindk.netlify.app",
  },
  {
    title: "Pure Fragrance",
    category: "Luxury E-Commerce",
    description: "Boutique fragrance and perfume store with interactive olfactory notes and streamlined checkout.",
    image: "/pics/perfume.png",
    demoUrl: "https://purefragnance.in",
  },
  {
    title: "All In AI",
    category: "AI SaaS Directory",
    description: "Curated AI platform featuring interactive directories, live category filtering, and authentication.",
    image: "/pics/allinai.png",
    demoUrl: "https://allinai.netlify.app",
  },
  {
    title: "Creative Studio",
    category: "Portfolio Website",
    description: "Bespoke digital design studio showcase with smooth GSAP animations and fluid gallery interactions.",
    image: "/pics/portfolio.png",
    demoUrl: "https://devkhandelwal.me/",
  },
  {
    title: "OTB Assessment",
    category: "EdTech & Analytics",
    description: "AI-driven assessment and goal tracking platform with personalized progress diagnostics.",
    image: "/pics/image.png",
    demoUrl: "https://otb-gix1.vercel.app/",
  },
  {
    title: "EventZone India",
    category: "Event Booking",
    description: "National event discovery portal allowing bookings, team inquiries, and venue showcases.",
    image: "/pics/event.png",
    demoUrl: "https://www.eventzone.co.in/",
  },
  {
    title: "Pardesi Naari",
    category: "Ethnic Fashion",
    description: "Women's ethnic couture e-commerce brand with rich lookbooks and international shipping.",
    image: "/pics/pardesinaari.png",
    demoUrl: "https://www.pardesinaari.store/",
  },
  {
    title: "StyleDora",
    category: "Anime & Fashion",
    description: "Anime-themed clothing and apparel e-commerce store with curated merchandise collections.",
    image: "/pics/styledora.png",
    demoUrl: "https://www.styledora.store/",
  },
  {
    title: "SocialFuse",
    category: "Creator SaaS",
    description: "End-to-end automation platform for creators, influencers, and brands to streamline content.",
    image: "/pics/socialfuse.png",
    demoUrl: "https://social-fuse.app/",
  },
  {
    title: "Apsara OFM Agency",
    category: "Agency Platform",
    description: "Full-service digital management and creator growth agency platform.",
    image: "/pics/ofm.png",
    demoUrl: "https://apsaraofm.vercel.app/",
  },
  {
    title: "ResPro",
    category: "Hospitality Portal",
    description: "Restaurant discovery and booking platform helping diners find the best local dining experiences.",
    image: "/pics/respro.png",
    demoUrl: "https://resptro.vercel.app/",
  },
  {
    title: "AI Resume Builder",
    category: "AI Productivity SaaS",
    description: "Smart resume builder helping professionals craft ATS-optimized resumes with AI suggestions.",
    image: "/pics/resume.png",
    demoUrl: "https://carrerpilott.vercel.app/",
  },
];

const VARIATIONS = [
  { id: 1, name: "Wave & Tilt", itemWidth: "850px", marginBottom: "-1.5rem", ar: "16/10", br: "20px" }
];

export default function RotatingScrollGallery() {
  const [activeVariation, setActiveVariation] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Position Wrappers horizontally with gentler wave for wider cards
      const amplitude = window.innerWidth > 768 ? window.innerWidth * 0.10 : window.innerWidth * 0.04;
      wrapRefs.current.forEach((wrap, i) => {
        if (!wrap) return;
        let xOffset = 0;
        if (activeVariation === 4) {
          xOffset = Math.sin(i) * amplitude;
        } else {
          const angle = i * 0.45;
          xOffset = Math.sin(angle) * amplitude;
        }
        gsap.set(wrap, { x: xOffset });
      });

      // 2. Animate Items on Scroll
      itemRefs.current.forEach((item) => {
        if (!item) return;

        if (activeVariation === 1) {
          const rx = gsap.utils.random(70, 110);
          const ry = gsap.utils.random(-20, 20);
          const rz = gsap.utils.random(-20, 20);
          const setZ = gsap.quickSetter(item, "z", "px");

          gsap.fromTo(
            item,
            { rotationX: rx, rotationY: ry, rotationZ: rz },
            {
              rotationX: -rx,
              rotationY: -ry,
              rotationZ: -rz,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom+=20%",
                end: "bottom top-=20%",
                scrub: true,
                invalidateOnRefresh: true,
                onUpdate(self) {
                  const z = Math.sin(self.progress * Math.PI) * -60;
                  setZ(z);
                },
              },
            }
          );
        } else if (activeVariation === 2) {
          const rx = gsap.utils.random(240, 290);
          const ry = gsap.utils.random(-25, 25);
          const rz = gsap.utils.random(-45, 45);
          const setZ = gsap.quickSetter(item, "z", "px");

          gsap.fromTo(
            item,
            { rotationX: rx, rotationY: ry, rotationZ: rz },
            {
              rotationX: -rx,
              rotationY: -ry,
              rotationZ: -rz,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom+=20%",
                end: "bottom top-=20%",
                scrub: true,
                invalidateOnRefresh: true,
                onUpdate(self) {
                  const z = Math.pow(Math.sin(self.progress * Math.PI), 4) * -300;
                  setZ(z);
                },
              },
            }
          );
        } else if (activeVariation === 3) {
          const setTransform = gsap.quickSetter(item, "css");
          ScrollTrigger.create({
            trigger: item,
            start: "top bottom+=20%",
            end: "bottom top-=20%",
            scrub: true,
            onUpdate(self) {
              const p = self.progress;
              const rotationX = (Math.sin(p * Math.PI) - 0.5) * 90;
              const z = Math.pow(Math.sin(p * Math.PI), 8) * -600;
              const yPercent = 1 + Math.pow(Math.cos(p * Math.PI), 2) * -30;
              const saturate = Math.pow(Math.sin(p * Math.PI), 2) + 0.2;
              setTransform({
                rotationX,
                z,
                yPercent,
                filter: `saturate(${saturate})`,
              });
            },
          });
        } else if (activeVariation === 4) {
          const rx = gsap.utils.random(-15, 15);
          const ry = gsap.utils.random(180, 260);
          const rz = gsap.utils.random(-15, 15);
          const setTransform = gsap.quickSetter(item, "css");

          ScrollTrigger.create({
            trigger: item,
            start: "top bottom+=20%",
            end: "bottom top-=20%",
            scrub: true,
            onUpdate(self) {
              const p = self.progress;
              const z = Math.sin(p * Math.PI) * -150;
              setTransform({
                rotationX: gsap.utils.interpolate(rx, -rx, p),
                rotationY: gsap.utils.interpolate(ry, -ry, p),
                rotationZ: gsap.utils.interpolate(rz, -rz, p),
                z,
              });
            },
          });
        } else {
          // Variation 5
          const rx = gsap.utils.random(50, 80);
          const ry = gsap.utils.random(-15, 15);
          const rz = gsap.utils.random(-30, 30);
          const setZ = gsap.quickSetter(item, "z", "px");

          gsap.fromTo(
            item,
            { rotationX: rx, rotationY: ry, rotationZ: rz },
            {
              rotationX: -rx,
              rotationY: -ry,
              rotationZ: -rz,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom+=25%",
                end: "bottom top-=25%",
                scrub: true,
                onUpdate(self) {
                  const z = Math.sin(self.progress * Math.PI) * -80;
                  setZ(z);
                },
              },
            }
          );
        }
      });

      // 3. Marquee Scrubbing Timeline
      if (galleryRef.current && marqueeInnerRef.current) {
        gsap.fromTo(
          marqueeInnerRef.current,
          { x: "40vw" },
          {
            x: "-60vw",
            ease: "none",
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeVariation]);

  const currentVar = VARIATIONS.find((v) => v.id === activeVariation) || VARIATIONS[0];

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className={styles.section}
      style={
        {
          "--item-width": currentVar.itemWidth,
          "--item-margin-bottom": currentVar.marginBottom,
          "--item-ar": currentVar.ar,
          "--item-br": currentVar.br,
        } as React.CSSProperties
      }
    >
      <div className={styles.vignette} />

      <header className={styles.headerFrame}>
        <span className={styles.badge}>Featured Work</span>
        <h2 className={styles.title}>Our Portfolio</h2>
        <p className={styles.subtitle}>
          Explore our client websites and web applications in an interactive 3D spatial reel.
          Click any card to launch the live demo.
        </p>

        {VARIATIONS.length > 1 && (
          <div className={styles.demoSwitcher}>
            {VARIATIONS.map((v) => (
              <button
                key={v.id}
                onClick={() => setActiveVariation(v.id)}
                className={`${styles.demoBtn} ${activeVariation === v.id ? styles.activeDemoBtn : ""}`}
              >
                {v.name}
              </button>
            ))}
          </div>
        )}
      </header>

      <div className={styles.marqueeContainer}>
        <div ref={marqueeInnerRef} className={styles.marqueeInner}>
          <span>FEATURED WORK</span>
          <span>/</span>
          <span>CLIENT SHOWCASE</span>
          <span>/</span>
          <span>WEB DESIGN</span>
          <span>/</span>
          <span>SPATIAL 3D REEL</span>
        </div>
      </div>

      <div ref={galleryRef} className={styles.gallery}>
        {PORTFOLIO_PROJECTS.map((project, index) => (
          <div
            key={index}
            ref={(el) => {
              wrapRefs.current[index] = el;
            }}
            className={styles.galleryItemWrap}
          >
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={styles.galleryCard}
              style={{ backgroundImage: `url('${project.image}')` }}
            >
              <div className={styles.cardOverlay}>
                <span className={styles.cardCategory}>{project.category}</span>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>
                <span className={styles.cardLink}>
                  Live Demo <ExternalLink size={14} />
                </span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
