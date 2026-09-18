import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ReelFluxLanding.module.css";
import { images } from "@/lib/reel-flux/data";
import { scrollState } from "@/hooks/useScroll";
import Scene from "./Scene";

gsap.registerPlugin(ScrollTrigger);

export default function ReelFluxLanding() {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "+=2200",
                pin: true,
                anticipatePin: 1,
                scrub: 1,
                onUpdate: (self) => {
                    scrollState.progress = self.progress * 1.5;
                    scrollState.velocity = self.getVelocity();
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className={styles.container}>
            <div className={styles.canvasWrapper}>
                <Scene />
            </div>

            <div className={styles.overlay}>
                <header className={styles.header}>
                    <div className={styles.brand}>
                        <span>LAY'S</span>
                        <span className={styles.brandDot} />
                    </div>
                </header>

                <footer className={styles.footer}>

                </footer>
            </div>
        </section>
    );
}
