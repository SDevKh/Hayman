// Minimal type surface for `locomotive-scroll@3.5.4`, which ships no typings of
// its own. Only the members the landing design actually uses are declared.
declare module "locomotive-scroll" {
  export interface LocomotiveScrollOptions {
    el?: Element | null;
    smooth?: boolean;
    [option: string]: unknown;
  }

  export interface LocomotiveScrollScroller {
    instance: {
      scroll: { x: number; y: number };
    };
    scrollTo: (
      target: unknown,
      offset?: number,
      duration?: number,
      options?: Record<string, unknown>,
    ) => void;
  }

  export default class LocomotiveScroll {
    constructor(options?: LocomotiveScrollOptions);
    html: HTMLElement;
    scroll: LocomotiveScrollScroller;
    on(event: string, callback: (...args: unknown[]) => void): void;
    off(event: string, callback: (...args: unknown[]) => void): void;
    update(): void;
    scrollTo(
      target: unknown,
      offset?: number,
      duration?: number,
      options?: Record<string, unknown>,
    ): void;
    stop(): void;
    start(): void;
    destroy(): void;
  }
}
