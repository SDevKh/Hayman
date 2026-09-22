import { useEffect } from "react";
import designMarkup from "./cuberto-design.html?raw";
import { initCubertoDesign } from "./useCubertoDesign";

/**
 * Home page — "Cuberto style" design that ships inside
 * `src/components/CubertoDesign/cuberto-design.html`.
 *
 * The markup is injected verbatim (the design was authored as a standalone
 * static page, so keeping the DOM byte-identical guarantees the CSS and the
 * GSAP/Locomotive Scroll timeline in `useCubertoDesign` behave exactly as the
 * original). All media the markup references lives in `public/` (e.g.
 * `/p1video.mp4`, `/style.css`) so the relative `./…` URLs keep working.
 */
const CubertoDesignLanding = () => {
  // Runs after the markup above is in the DOM, mirrors the original script.js
  // which was loaded at the end of <body>.
  useEffect(() => initCubertoDesign(), []);

  return (
    <div
      id="cuberto-design"
      dangerouslySetInnerHTML={{ __html: designMarkup }}
    />
  );
};

export default CubertoDesignLanding;
