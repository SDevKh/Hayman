import { useEffect, type RefObject } from "react";
import Lenis from "lenis";

/**
 * Shared scroll state between Lenis DOM scroll and React Three Fiber useFrame loop.
 */
export const scrollState = {
    /** 0 → 1, wraps thanks to `infinite: true` */
    progress: 0,
    /** px per frame, signed */
    velocity: 0,
};

/**
 * Mounts Lenis on a wrapper/content pair. The content is a tall spacer;
 * Lenis handles wheel, touch, inertia, smoothing and infinite wrapping.
 */
export function useLenisScroll(
    wrapperRef: RefObject<HTMLElement | null>,
    contentRef: RefObject<HTMLElement | null>
) {
    useEffect(() => {
        const wrapper = wrapperRef.current;
        const content = contentRef.current;
        if (!wrapper || !content) return;

        const lenis = new Lenis({
            wrapper,
            content,
            infinite: true,
            orientation: "vertical",
            gestureOrientation: "both",
            syncTouch: true,
            lerp: 0.08,
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
        });

        lenis.on("scroll", ({ progress, velocity }: Lenis) => {
            scrollState.progress = progress;
            scrollState.velocity = velocity;
        });

        let raf = requestAnimationFrame(function loop(time) {
            lenis.raf(time);
            raf = requestAnimationFrame(loop);
        });

        return () => {
            cancelAnimationFrame(raf);
            lenis.destroy();
        };
    }, [wrapperRef, contentRef]);
}
