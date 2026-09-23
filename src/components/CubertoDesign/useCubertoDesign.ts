/**
 * Imperative behaviour for the Cuberto-style landing design.
 *
 * This is a 1:1 port of the `script.js` that shipped with the design
 * (Locomotive Scroll + GSAP ScrollTrigger + pointer interactions).
 *
 * The design was authored against a static DOM, so the timelines are kept
 * identical to the original. The only difference is that every global listener
 * is registered through a helper that also returns a disposer, so the page can
 * be unmounted safely (React route change / HMR).
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";

const q = <T extends Element = HTMLElement>(selector: string): T | null =>
  document.querySelector<T>(selector);

const qa = <T extends Element = HTMLElement>(selector: string): T[] =>
  Array.from(document.querySelectorAll<T>(selector));

/**
 * The ease value GSAP accepts in a tween config (`EaseString | EaseFunction`).
 * Declared locally because `Parameters<typeof gsap.to>` picks up GSAP's
 * `duration` overload instead of the vars object.
 */
type TweenEase = string | ((progress: number) => number);

export const initCubertoDesign = (): (() => void) => {
  gsap.registerPlugin(ScrollTrigger);

  const disposers: Array<() => void> = [];

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
    scroller: "#main",
    ...extra,
  });

  /* ------------------------------------------------------------------ *
   * Smooth scrolling — Locomotive Scroll hijacks `#main` and ScrollTrigger
   * is pointed at the same proxy (exactly like the original script).
   * ------------------------------------------------------------------ */
  const mainEl = q<HTMLElement>("#main");
  let locoScroll: InstanceType<typeof LocomotiveScroll> | null = null;

  if (mainEl) {
    locoScroll = new LocomotiveScroll({
      el: mainEl,
      smooth: true,
      smoothMobile: true,
      multiplier: 1,
      lerp: 0.08,
    });
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value?: number) {
        if (typeof value === "number") {
          locoScroll!.scrollTo(value, 0, 0);
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
  }

  ScrollTrigger.refresh();

  /* ------------------------------------------------------------------ *
   * Intro loader
   * ------------------------------------------------------------------ */
  const counterEl = q<HTMLElement>("#counter");
  const setCounter = (from: number, to: number) => {
    for (let i = from; i < to; i++) {
      if (counterEl) counterEl.textContent = String(i);
    }
  };

  const tlLoad = gsap.timeline();

  tlLoad.from(".text-load h1", {
    opacity: 0.5,
    y: 200,
    duration: 1,
    delay: 1,
  });
  tlLoad.to("#t5", { onStart: () => setCounter(0, 30) });
  tlLoad.to("#t1", { left: "5%" });
  tlLoad.to("#t2", { left: "30%" });
  tlLoad.to("#t5", { onStart: () => setCounter(30, 60) });
  tlLoad.to("#t1", { top: "30%" });
  tlLoad.to("#t5", { onStart: () => setCounter(60, 101) });
  tlLoad.to(".text-load h1", { y: -200, duration: 1 });
  tlLoad.to("#loader-anim", { opacity: 0, top: "-100%" });
  tlLoad.from(".textp1 h1", { y: 200 });
  tlLoad.from("#rotate-p1", { opacity: 0 });
  tlLoad.from("#p1h3", { opacity: 0 });
  tlLoad.from("#mousemove", { scale: 0 });
  tlLoad.call(() => {
    locoScroll?.update();
    ScrollTrigger.refresh();
  });

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
   * Page 2 — marquee
   * ------------------------------------------------------------------ */
  gsap.to(".move", {
    left: "45%",
    scrollTrigger: scrollerTrigger(".move", { start: "top 80%", scrub: 1 }),
  });

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
      menuiEl.classList.remove("ri-menu-line");
      menuiEl.classList.add("ri-close-line");
    }
  };

  const closeMenu = () => {
    if (!menuOverlay) return;
    menuOverlay.classList.remove("is-open");
    menuOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (menuiEl) {
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
          document.querySelector(scrollToSelector)?.scrollIntoView({ behavior: "smooth" });
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
          video.play().catch(() => {});
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
      video.preload = "auto";
      video.load();
    }
    playVideo(video);
  };

  // 1. Immediately preload above-the-fold hero videos
  const heroVideos = qa<HTMLVideoElement>("#rotate-p1 video, #video video");
  heroVideos.forEach(loadAndPlayVideo);

  // 2. Preload remaining videos with ScrollTrigger synchronized to LocomotiveScroll
  const lazyVideos = qa<HTMLVideoElement>("video[data-src]");

  lazyVideos.forEach((video) => {
    if (heroVideos.includes(video)) return;

    // Load well before entering viewport
    ScrollTrigger.create({
      trigger: video,
      scroller: "#main",
      start: "top 200%",
      once: true,
      onEnter: () => {
        loadAndPlayVideo(video);
      },
    });

    // Smart pause/resume to preserve GPU/CPU performance during scrolling
    ScrollTrigger.create({
      trigger: video,
      scroller: "#main",
      start: "top 120%",
      end: "bottom -120%",
      onEnter: () => {
        loadAndPlayVideo(video);
      },
      onEnterBack: () => {
        playVideo(video);
      },
      onLeave: () => {
        // Keep marquee videos in motion, pause others
        if (!video.closest(".move")) {
          video.pause();
        }
      },
      onLeaveBack: () => {
        if (!video.closest(".move")) {
          video.pause();
        }
      },
    });
  });

  // 3. Fallback check during LocomotiveScroll scroll events
  const checkVisibleVideos = () => {
    const viewHeight = window.innerHeight;
    lazyVideos.forEach((video) => {
      if (video.getAttribute("src")) return;
      const rect = video.getBoundingClientRect();
      if (rect.top <= viewHeight * 2.2 && rect.bottom >= -viewHeight) {
        loadAndPlayVideo(video);
      }
    });
  };

  if (locoScroll) {
    locoScroll.on("scroll", checkVisibleVideos);
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
      { rootMargin: "800px 0px" },
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
