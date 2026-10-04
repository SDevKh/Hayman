import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";

const q = <T extends Element = HTMLElement>(selector: string): T | null =>
  document.querySelector<T>(selector);

const qa = <T extends Element = HTMLElement>(selector: string): T[] =>
  Array.from(document.querySelectorAll<T>(selector));

type TweenEase = string | ((progress: number) => number);

const isMobileDevice = (): boolean => {
  if (typeof window === "undefined") return false;
  return (
    window.innerWidth <= 768 ||
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    ) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) ||
    Boolean(
      window.matchMedia &&
      window.matchMedia("(pointer: coarse) and (max-width: 1024px)").matches,
    )
  );
};

export const initCubertoDesign = (): (() => void) => {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  const disposers: Array<() => void> = [];
  const isMobile = isMobileDevice();

  const listen = (
    target: EventTarget | null | undefined,
    type: string,
    handler: (event: Event) => void,
  ) => {
    if (!target) return;
    target.addEventListener(type, handler);
    disposers.push(() => target.removeEventListener(type, handler));
  };

  const scrollerTrigger = (
    trigger: string,
    extra: Record<string, unknown> = {},
  ) => ({
    trigger,
    ...(isMobile ? {} : { scroller: "#main" }),
    ...extra,
  });

  const mainEl = q<HTMLElement>("#main");
  let locoScroll: InstanceType<typeof LocomotiveScroll> | null = null;

  if (!isMobile && mainEl) {
    locoScroll = new LocomotiveScroll({
      el: mainEl,
      smooth: true,
      smoothMobile: false,
      multiplier: 1,
      lerp: 0.08,
    });
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value?: number) {
        if (typeof value === "number" && locoScroll) {
          try {
            locoScroll.scrollTo(value, 0, 0);
          } catch (_) { }
        }
        return (
          locoScroll?.scroll?.instance?.scroll?.y ??
          (typeof value === "number" ? value : 0)
        );
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: mainEl.style.transform ? "transform" : "fixed",
    });

    const onScrollTriggerRefresh = () => locoScroll?.update();
    ScrollTrigger.addEventListener("refresh", onScrollTriggerRefresh);
    disposers.push(() =>
      ScrollTrigger.removeEventListener("refresh", onScrollTriggerRefresh),
    );

    const syncScroll = () => {
      locoScroll?.update();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", syncScroll);
    disposers.push(() => window.removeEventListener("resize", syncScroll));

    const t1 = setTimeout(syncScroll, 300);
    const t2 = setTimeout(syncScroll, 1000);
    const t3 = setTimeout(syncScroll, 2500);
    disposers.push(() => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    });
  } else {
    // Ensure clean state on mobile without residual locomotive classes
    document.documentElement.classList.remove(
      "has-scroll-init",
      "has-scroll-smooth",
      "has-scroll-scrolling",
      "has-scroll-dragging",
    );
    const syncScroll = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", syncScroll);
    disposers.push(() => window.removeEventListener("resize", syncScroll));
  }

  ScrollTrigger.refresh();

  const getScrollY = () => {
    if (locoScroll && !isMobile) {
      return (
        locoScroll.scroll?.instance?.scroll?.y ??
        window.scrollY ??
        0
      );
    }
    return window.scrollY || window.pageYOffset || 0;
  };

  /* ------------------------------------------------------------------ *
   * Intro Loader & Hero Reveal Animation ("We Create Digital Solutions")
   * ------------------------------------------------------------------ */
  const loaderEl = q<HTMLElement>("#loader-anim");
  const counterEl = q<HTMLElement>("#counter");

  if (loaderEl) {
    // Initial states: loader starts visible and covering screen
    gsap.set(loaderEl, { display: "flex", opacity: 1, yPercent: 0 });

    // Initial state for hero elements so they are cleanly hidden under the loader
    gsap.set("#T1 h1, #T3 h1, #T4 h1", { yPercent: 120, opacity: 0 });
    gsap.set("#T2", { y: 35, opacity: 0, scale: 0.94 });
    gsap.set("#p1h3", { opacity: 0 });
    gsap.set("#video", { opacity: 0, scale: 0.92 });

    const tlLoad = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        if (loaderEl) {
          loaderEl.style.display = "none";
          loaderEl.style.pointerEvents = "none";
        }
        locoScroll?.update();
        ScrollTrigger.refresh();
      },
    });

    // 1. Reveal loader words "we create digital solutions_"
    tlLoad.from(".text-load h1", {
      yPercent: 120,
      opacity: 0,
      duration: 0.65,
      stagger: 0.08,
      ease: "power3.out",
    }, 0.05);

    // 2. Smoothly count 0% -> 100%
    const counterObj = { val: 0 };
    tlLoad.to(counterObj, {
      val: 100,
      duration: 1.4,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterEl) counterEl.textContent = Math.round(counterObj.val).toString();
      },
    }, 0.1);

    // 3. Playful subtle movement on #t1 ("we") and #t2 ("create")
    tlLoad.to("#t1", { xPercent: -5, duration: 0.8, ease: "sine.inOut" }, 0.55);
    tlLoad.to("#t2", { xPercent: 5, duration: 0.8, ease: "sine.inOut" }, 0.55);

    // 4. Loader text slides up and exits
    tlLoad.to(".text-load h1", {
      yPercent: -120,
      opacity: 0,
      duration: 0.45,
      stagger: 0.04,
      ease: "power2.in",
    }, 1.5);

    // 5. Black curtain lifts up smoothly
    tlLoad.to(loaderEl, {
      yPercent: -100,
      duration: 0.75,
      ease: "power4.inOut",
    }, 1.8);

    // 6. Hero elements reveal with signature Cuberto typography slide-up & pill bounce
    tlLoad.to("#T1 h1, #T3 h1, #T4 h1", {
      yPercent: 0,
      opacity: 1,
      duration: 0.85,
      stagger: 0.08,
      ease: "power3.out",
    }, 2.05);

    tlLoad.to("#T2", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.85,
      ease: "back.out(1.2)",
    }, 2.15);

    tlLoad.to("#p1h3", {
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
    }, 2.25);

    tlLoad.to("#video", {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
    }, 2.25);

    tlLoad.fromTo("#mousemove", { scale: 0 }, { scale: 1, duration: 0.4 }, 2.35);

    (window as any).__replayIntro = () => {
      if (loaderEl) {
        gsap.set(loaderEl, { display: "flex", opacity: 1, yPercent: 0, pointerEvents: "all" });
      }
      tlLoad.restart();
    };
  } else {
    // Fallback if loader element is missing
    gsap.set("#T1 h1, #T3 h1, #T4 h1", { yPercent: 0, opacity: 1 });
    gsap.set("#T2", { y: 0, opacity: 1, scale: 1 });
    gsap.set("#p1h3", { opacity: 1 });
    gsap.set("#video", { opacity: 1, scale: 1 });
    locoScroll?.update();
    ScrollTrigger.refresh();
  }

  /* ------------------------------------------------------------------ *
   * Page 1
   * ------------------------------------------------------------------ */
  gsap.to("#video", {
    left: "0%",
    width: "95vw",
    top: "42%",
    duration: 0.01,
    scrollTrigger: scrollerTrigger("#video", {
      start: "top 74%",
      end: "bottom 90%",
      scrub: 0.1,
    }),
  });

  gsap.to("#video video", {
    scale: "1",
    duration: 0.01,
    scrollTrigger: scrollerTrigger("#video", {
      start: "top 77%",
      end: "bottom 5%",
      scrub: 0.1,
    }),
  });

  gsap.to("#p1h3 h3", {
    opacity: 0,
    scrollTrigger: scrollerTrigger("#p1h3 h3", { start: "top 85%", scrub: 0.1 }),
  });

  /* ------------------------------------------------------------------ *
   * Page 2 — marquee with Cuberto-style dynamic scroll velocity
   * ------------------------------------------------------------------ */
  const moveEl = q<HTMLElement>("#page2 .move");
  if (moveEl) {
    let xPos = 0;
    const baseSpeed = isMobile ? -1.8 : -1.9; // constant forward gliding
    let scrollVelocity = 0;
    let lastScrollY = 0;
    let animId: number;

    const getUnitWidth = () => {
      // .move contains 6 pairs of h1 + video. Half = 3 pairs (seamless loop unit)
      return moveEl.scrollWidth > 0 ? moveEl.scrollWidth / 2 : 1200;
    };

    lastScrollY = getScrollY();

    const onScroll = (args?: any) => {
      const currentY =
        args?.scroll?.y ??
        (locoScroll?.scroll?.instance?.scroll?.y ?? (window.scrollY || window.pageYOffset || 0));
      const delta = currentY - lastScrollY;
      lastScrollY = currentY;

      // Scroll Down (delta > 0) -> accelerate leftward (negative)
      // Scroll Up (delta < 0) -> scrub rightward (positive)
      const clampedDelta = Math.max(-100, Math.min(100, delta));
      scrollVelocity += -clampedDelta * (isMobile ? 0.05 : 0.06);
      // Clamp max velocity to prevent uncontrolled spinning
      scrollVelocity = Math.max(-40, Math.min(40, scrollVelocity));
    };

    if (locoScroll && !isMobile) {
      locoScroll.on("scroll", onScroll);
    } else {
      window.addEventListener("scroll", onScroll, { passive: true });
      disposers.push(() => window.removeEventListener("scroll", onScroll));
    }

    const updateMarquee = () => {
      // Smooth kinetic decay of scroll velocity back to 0
      scrollVelocity *= 0.92;
      if (Math.abs(scrollVelocity) < 0.02) scrollVelocity = 0;

      xPos += baseSpeed + scrollVelocity;

      const unitWidth = getUnitWidth();
      if (unitWidth > 50) {
        while (xPos <= -unitWidth) {
          xPos += unitWidth;
        }
        while (xPos > 0) {
          xPos -= unitWidth;
        }
      }

      moveEl.style.transform = `translate3d(${xPos}px, -50%, 0)`;
      animId = requestAnimationFrame(updateMarquee);
    };

    animId = requestAnimationFrame(updateMarquee);

    disposers.push(() => {
      cancelAnimationFrame(animId);
    });
  }

  /**
   * The "string" SVG that bounces towards the pointer. `ease` is handed the
   * DOM node itself, matching the original file (GSAP falls back to its
   * default ease for non-function values).
   */
  const stringPathIdle = "M 10 100 Q 758 100 1426 100";
  qa<HTMLElement>("#string").forEach((bounce) => {
    // `ease` is handed the DOM node itself, exactly like the original file.
    // GSAP stringifies unknown eases and falls back to its default, so this is
    // reproduced verbatim instead of "fixed".
    const ease = bounce as unknown as TweenEase;

    listen(bounce, "mousemove", (event: Event) => {
      const { clientY } = event as MouseEvent;
      gsap.to("#string>svg>path", {
        attr: { d: `M 10 100 Q 758 ${clientY - 550} 1426 100` },
        ease,
        duration: 0.3,
      });
    });
    listen(bounce, "mouseleave", () => {
      gsap.to("#string>svg>path", {
        attr: { d: stringPathIdle },
        ease,
        duration: 0.2,
      });
    });
  });

  /* ------------------------------------------------------------------ *
   * Page 3 & Page 4 Responsive Timelines
   * ------------------------------------------------------------------ */
  const tl = gsap.timeline();
  const tl2 = gsap.timeline();

  ScrollTrigger.matchMedia({
    // Desktop viewports: pin and expand video wrappers
    "(min-width: 769px)": function () {
      tl.to("#p3-video-wrapper", {
        width: "35vw",
        height: "57vh",
        scrollTrigger: scrollerTrigger("#p3-video-wrapper", {
          start: "top 20%",
          end: "top 25%",
          scrub: 1,
        }),
      });

      tl.to("#p3-video-wrapper", {
        scrollTrigger: scrollerTrigger("#p3-video-wrapper", {
          start: "top 15%",
          end: "bottom -50%",
          pin: true,
          scrub: 1,
        }),
      });

      tl2.to("#p4-video-wrapper", {
        width: "35vw",
        height: "57vh",
        x: 150,
        scrollTrigger: scrollerTrigger("#p4-video-wrapper", {
          start: "top 20%",
          end: "top 25%",
          scrub: 1,
        }),
      });

      tl2.to("#p4-video-wrapper", {
        scrollTrigger: scrollerTrigger("#p4-video-wrapper", {
          start: "top 15%",
          end: "bottom -80%",
          pin: true,
          scrub: 1,
        }),
      });

      gsap.to("#page5>img", {
        x: -400,
        scrollTrigger: scrollerTrigger("#page5>img", { start: "top 30%", scrub: 1 }),
      });
    },

    // Mobile viewports: subtle parallax without pinned lockups or horizontal shifts
    "(max-width: 768px)": function () {
      gsap.to("#page5>img", {
        x: -60,
        scrollTrigger: scrollerTrigger("#page5>img", { start: "top 50%", scrub: 1 }),
      });
    },
  });

  /* ------------------------------------------------------------------ *
   * Pages 7 and 10
   * ------------------------------------------------------------------ */
  gsap.to(".p7move1anim", {
    left: "45%",
    scrollTrigger: scrollerTrigger(".p7move1anim", { start: "top 60%", scrub: 1 }),
  });

  gsap.to(".p7move2anim", {
    left: "-45%",
    scrollTrigger: scrollerTrigger(".p7move2anim", { start: "top 60%", scrub: 1 }),
  });

  gsap.to(".p7move3anim", {
    left: "45%",
    scrollTrigger: scrollerTrigger(".p7move3anim", { start: "top 60%", scrub: 1 }),
  });

  gsap.to(".p7move4anim", {
    left: "-45%",
    scrollTrigger: scrollerTrigger(".p7move4anim", { start: "top 60%", scrub: 1 }),
  });

  /* ------------------------------------------------------------------ *
   * Page 8 — Dual opposing tech stack marquees (Cuberto kinetic ticker)
   * Line 1 (.p8moveanim): moves continuously towards LEFT
   * Line 2 (.p8moveanim2): moves continuously towards RIGHT
   * Both scrub & accelerate reactively with scroll velocity!
   * ------------------------------------------------------------------ */
  const p8Anim1 = q<HTMLElement>("#p8move .p8moveanim");
  const p8Anim2 = q<HTMLElement>("#p8move2 .p8moveanim2");

  if (p8Anim1 && p8Anim2) {
    p8Anim1.style.animation = "none";
    p8Anim2.style.animation = "none";

    let x1 = 0;
    let x2 = 0;
    let initialized = false;

    // Line 1 glides leftward (negative), Line 2 glides rightward (positive)
    const baseSpeed1 = isMobile ? -1.0 : -1.4;
    const baseSpeed2 = isMobile ? 1.0 : 1.4;

    let p8Velocity = 0;
    let p8LastScrollY = getScrollY();
    let p8AnimId: number;

    const getUnit1 = () => (p8Anim1.scrollWidth > 0 ? p8Anim1.scrollWidth / 2 : 1200);
    const getUnit2 = () => (p8Anim2.scrollWidth > 0 ? p8Anim2.scrollWidth / 2 : 1200);

    const onP8Scroll = (args?: any) => {
      const currentY =
        args?.scroll?.y ??
        (locoScroll?.scroll?.instance?.scroll?.y ?? (window.scrollY || window.pageYOffset || 0));
      const delta = currentY - p8LastScrollY;
      p8LastScrollY = currentY;

      // Scrolling Down (delta > 0) -> accelerates Line 1 leftward, Line 2 rightward
      // Scrolling Up (delta < 0) -> scrubs Line 1 rightward, Line 2 leftward
      const clampedDelta = Math.max(-100, Math.min(100, delta));
      p8Velocity += clampedDelta * (isMobile ? 0.03 : 0.03);
      p8Velocity = Math.max(-60, Math.min(60, p8Velocity));
    };

    if (locoScroll && !isMobile) {
      locoScroll.on("scroll", onP8Scroll);
    } else {
      window.addEventListener("scroll", onP8Scroll, { passive: true });
      disposers.push(() => window.removeEventListener("scroll", onP8Scroll));
    }

    const updateP8Marquee = () => {
      // Smooth kinetic decay back to 0
      p8Velocity *= 0.92;
      if (Math.abs(p8Velocity) < 0.02) p8Velocity = 0;

      const unit1 = getUnit1();
      const unit2 = getUnit2();

      if (!initialized && unit2 > 50) {
        // Offset Line 2 to -unit2 / 2 so badges fill both left and right from the start
        x2 = -unit2 / 2;
        initialized = true;
      }

      // Line 1: moves LEFT
      x1 += baseSpeed1 - p8Velocity;
      if (unit1 > 50) {
        while (x1 <= -unit1) x1 += unit1;
        while (x1 > 0) x1 -= unit1;
      }
      p8Anim1.style.transform = `translate3d(${x1}px, 0, 0)`;

      // Line 2: moves RIGHT
      x2 += baseSpeed2 + p8Velocity;
      if (unit2 > 50) {
        while (x2 >= 0) x2 -= unit2;
        while (x2 < -unit2) x2 += unit2;
      }
      p8Anim2.style.transform = `translate3d(${x2}px, 0, 0)`;

      p8AnimId = requestAnimationFrame(updateP8Marquee);
    };

    p8AnimId = requestAnimationFrame(updateP8Marquee);
    disposers.push(() => cancelAnimationFrame(p8AnimId));
  }

  ["1", "2", "3"].forEach((index) => {
    gsap.from(`#p10-videocontainer-${index}`, {
      width: "0%",
      opacity: 0,
      scrollTrigger: scrollerTrigger(`#p10-videocontainer-${index}`, {
        start: "top 80%",
      }),
    });
  });

  /* ------------------------------------------------------------------ *
   * Flip cards touch / click toggle support
   * ------------------------------------------------------------------ */
  qa<HTMLElement>(".flip-cards").forEach((card) => {
    listen(card, "click", (e: Event) => {
      const target = e.target as HTMLElement;
      if (target && target.closest("a")) return;
      card.classList.toggle("is-flipped");
    });
  });

  /* ------------------------------------------------------------------ *
   * Custom cursor (desktop with fine pointer only)
   * ------------------------------------------------------------------ */
  const cursorEl = q<HTMLElement>("#mousemove");

  if (window.matchMedia("(pointer: fine)").matches) {
    listen(window, "mousemove", (event: Event) => {
      const { x, y } = event as MouseEvent;
      gsap.to("#mousemove", { top: `${y}px`, left: `${x}px` });
    });
  }

  const cursorColors: Array<[string, string]> = [
    ["#page1", "#FFFFFF"],
    ["#page2", "black"],
    ["#page3", "#FFFFFF"],
    ["#page3-down", "black"],
    ["#page4", "black"],
    ["#page5", "#FFFFFF"],
    ["#page6", "#FFFFFF"],
    ["#page7", "#FFFFFF"],
    ["#page8", "#FFFFFF"],
    ["#page9", "#FFFFFF"],
    ["#page10", "black"],
    ["#page11", "black"],
    ["#page12", "#FFFFFF"],
    ["#page13", "#FFFFFF"],
  ];

  cursorColors.forEach(([selector, color]) => {
    listen(q(selector), "mouseenter", () => {
      if (cursorEl) cursorEl.style.backgroundColor = color;
    });
  });

  const menuiEl = q<HTMLElement>("#menui");

  listen(menuiEl, "mouseenter", () => {
    if (!menuiEl) return;
    menuiEl.style.backgroundColor = "white";
    menuiEl.style.color = "black";
  });

  listen(menuiEl, "mouseleave", () => {
    if (!menuiEl) return;
    menuiEl.style.backgroundColor = "transparent";
    menuiEl.style.color = "white";
  });

  /* ------------------------------------------------------------------ *
   * Navigation Menu Interaction
   * ------------------------------------------------------------------ */
  const menuOverlay = q<HTMLElement>("#cuberto-menu-overlay");
  const menuCloseBtn = q<HTMLElement>("#cuberto-menu-close");
  const menuBackdrop = q<HTMLElement>(".cuberto-menu-backdrop");
  const nav2El = q<HTMLElement>("#nav2");

  const openMenu = () => {
    if (!menuOverlay) return;
    menuOverlay.classList.add("is-open");
    menuOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (menuiEl) {
      menuiEl.style.opacity = "0";
      menuiEl.style.pointerEvents = "none";
    }
  };

  const closeMenu = () => {
    if (!menuOverlay) return;
    menuOverlay.classList.remove("is-open");
    menuOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (menuiEl) {
      menuiEl.style.opacity = "1";
      menuiEl.style.pointerEvents = "auto";
      menuiEl.classList.remove("ri-close-line");
      menuiEl.classList.add("ri-menu-line");
    }
  };

  const toggleMenu = () => {
    if (menuOverlay?.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  listen(menuiEl, "click", toggleMenu);
  listen(nav2El, "click", toggleMenu);
  listen(menuCloseBtn, "click", closeMenu);
  listen(menuBackdrop, "click", closeMenu);

  listen(window, "keydown", (e: Event) => {
    if ((e as KeyboardEvent).key === "Escape") {
      closeMenu();
    }
  });

  qa<HTMLAnchorElement>(".cuberto-menu-link").forEach((link) => {
    listen(link, "click", (e: Event) => {
      const scrollToSelector = link.getAttribute("data-scroll-to");
      const navPath = link.getAttribute("data-nav");

      if (scrollToSelector) {
        e.preventDefault();
        closeMenu();
        if (locoScroll) {
          locoScroll.scrollTo(scrollToSelector);
        } else {
          const target = document.querySelector(scrollToSelector);
          if (target) {
            target.scrollIntoView({ behavior: "auto" });
          }
        }
      } else if (navPath) {
        e.preventDefault();
        closeMenu();
        window.location.href = navPath;
      }
    });
  });

  /* ------------------------------------------------------------------ *
   * High-Performance Lazy-load + Auto-streaming for background videos.
   *
   * 1. Hero fold videos are preloaded immediately so there is zero initial delay.
   * 2. Remaining videos are preloaded ahead of time (top 200%) via GSAP
   *    ScrollTrigger (fully synchronized with LocomotiveScroll's virtual scroller).
   * 3. Fallback checks via LocomotiveScroll scroll events + IntersectionObserver
   *    guarantee every video loads reliably across all devices.
   * 4. Smart pause/resume conserves GPU/CPU decoding resources when videos
   *    are far outside the viewport, maintaining a buttery smooth 60-120fps.
   * 5. Inline mobile playback attributes and autoplay policy fallbacks ensure
   *    universal playback without console errors.
   * ------------------------------------------------------------------ */
  const ensureVideoAttrs = (video: HTMLVideoElement) => {
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    if (!video.hasAttribute("playsinline")) video.setAttribute("playsinline", "");
    if (!video.hasAttribute("webkit-playsinline")) video.setAttribute("webkit-playsinline", "");
  };

  const playVideo = (video: HTMLVideoElement) => {
    ensureVideoAttrs(video);
    const promise = video.play();
    if (promise && typeof promise.catch === "function") {
      promise.catch(() => {
        // Autoplay may be restricted until user interaction
        const startOnInteract = () => {
          video.play().catch(() => { });
          window.removeEventListener("pointerdown", startOnInteract);
          window.removeEventListener("touchstart", startOnInteract);
          window.removeEventListener("keydown", startOnInteract);
        };
        window.addEventListener("pointerdown", startOnInteract, { once: true });
        window.addEventListener("touchstart", startOnInteract, { once: true });
        window.addEventListener("keydown", startOnInteract, { once: true });
      });
    }
  };

  const loadAndPlayVideo = (video: HTMLVideoElement) => {
    ensureVideoAttrs(video);
    const dataSrc = video.dataset.src;
    if (dataSrc && !video.getAttribute("src")) {
      video.src = dataSrc;
      video.preload = "metadata";
      video.load();
    }
    playVideo(video);
  };

  // 1. Immediately preload above-the-fold hero videos
  const heroVideos = qa<HTMLVideoElement>("#video video");
  heroVideos.forEach(loadAndPlayVideo);

  // 2. Preload remaining videos with ScrollTrigger synchronized to LocomotiveScroll (or window on mobile)
  const lazyVideos = qa<HTMLVideoElement>("video[data-src]");

  lazyVideos.forEach((video) => {
    if (heroVideos.includes(video)) return;

    // Load well before entering viewport
    ScrollTrigger.create({
      trigger: video,
      ...(isMobile ? {} : { scroller: "#main" }),
      start: "top 120%",
      once: true,
      onEnter: () => {
        loadAndPlayVideo(video);
      },
    });

    // Smart pause/resume to preserve GPU/CPU performance during scrolling
    ScrollTrigger.create({
      trigger: video,
      ...(isMobile ? {} : { scroller: "#main" }),
      start: "top 120%",
      end: "bottom -120%",
      onEnter: () => {
        loadAndPlayVideo(video);
      },
      onEnterBack: () => {
        playVideo(video);
      },
      onLeave: () => {
        video.pause();
      },
      onLeaveBack: () => {
        video.pause();
      },
    });
  });

  // 3. Fallback check during scroll events
  const checkVisibleVideos = () => {
    const viewHeight = window.innerHeight;
    lazyVideos.forEach((video) => {
      if (video.getAttribute("src")) return;
      const rect = video.getBoundingClientRect();
      if (rect.top <= viewHeight * 1.5 && rect.bottom >= -viewHeight * 0.5) {
        loadAndPlayVideo(video);
      }
    });
  };

  if (locoScroll) {
    locoScroll.on("scroll", checkVisibleVideos);
  } else {
    listen(window, "scroll", checkVisibleVideos);
  }

  // 4. Native IntersectionObserver backup
  if ("IntersectionObserver" in window) {
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const video = entry.target as HTMLVideoElement;
          loadAndPlayVideo(video);
          videoObserver.unobserve(video);
        });
      },
      { rootMargin: "400px 0px" },
    );
    lazyVideos.forEach((video) => videoObserver.observe(video));
    disposers.push(() => videoObserver.disconnect());
  }

  // Videos that already have direct src
  qa<HTMLVideoElement>("video[src]:not([data-src])").forEach(playVideo);

  /* ------------------------------------------------------------------ *
   * Teardown (route change / HMR / unmount)
   * ------------------------------------------------------------------ */
  return () => {
    disposers.splice(0).forEach((dispose) => dispose());

    document.body.style.overflow = "";

    tlLoad.kill();
    tl.kill();
    tl2.kill();

    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    if (locoScroll) {
      locoScroll.destroy();
      document.documentElement.classList.remove(
        "has-scroll-init",
        "has-scroll-smooth",
        "has-scroll-scrolling",
        "has-scroll-dragging",
      );
    }
  };
};

export default initCubertoDesign;
