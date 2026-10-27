import { Link } from "react-router";
import { useLenis } from "lenis/react";
import pageBg from "@/assets/vai-page-bg.png";
import { footerLinks } from "./footerLinks";
import { VAIDitherEdge, VAIDitherMark } from "./VAIFooterDither";
import { VAIGradientBackground } from "./VAIGradientBackground";
import { VolteoLogo } from "./VolteoLogo";

const CREAM = [245, 244, 233] as const;

// The hero's gradient, on the same shader. The footer is wide and short, so it shows the deep green swath of the artwork
// rather than the whole piece, which keeps cream type readable across its full width.
const GRADIENT_FOCUS = { x: 0.43, y: 0.27, zoom: 3 };

// The page melts into the gradient through a dither band, and the footer closes on the VAI mark dissolving into the same
// dither as the ship.
const css = `
.vai-f {
  --cream: #f5f4e9;
  --dim: rgba(245, 244, 233, 0.92);
  --line: rgba(245, 244, 233, 0.36);
  --pad: clamp(24px, 4.53vw, 96px);
  position: relative;
  overflow: hidden;
  background: #3a6230;
  color: var(--cream);
  /* a faint halo keeps the small type clear where the gradient drifts lighter */
  text-shadow: 0 0 14px rgba(0, 38, 26, 0.42);
}
.vai-f__edge { position: relative; line-height: 0; }
.vai-f__body {
  position: relative;
  padding: 0 var(--pad);
  background: linear-gradient(to top, rgba(0, 32, 22, 0.34), transparent 160px);
}
.vai-f__top { display: grid; gap: 48px; padding-top: 48px; }
.vai-f__lead {
  max-width: 11em;
  margin: 0;
  font: 400 clamp(36px, 3.8vw, 64px) / 1.1 'OldStyle 1', 'Amiri Quran', Georgia, serif;
  letter-spacing: -0.02em;
}
.vai-f__by {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-top: 36px;
  color: var(--dim);
  font: 400 13px / 1 'IBM Plex Mono', ui-monospace, monospace;
  text-decoration: none;
}
.vai-f__nav { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 40px 32px; }
.vai-f__label {
  margin: 0 0 18px;
  color: var(--dim);
  font: 400 12px / 1 'IBM Plex Mono', ui-monospace, monospace;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.vai-f__nav ul { display: flex; flex-direction: column; gap: 12px; margin: 0; padding: 0; list-style: none; }
.vai-f a,
.vai-f button { color: inherit; }
.vai-f__nav a {
  color: var(--cream);
  font: 400 15px / 1.2 'IBM Plex Mono', ui-monospace, monospace;
  text-decoration: none;
  background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat;
  transition: background-size 0.25s ease;
}
.vai-f__nav a:hover,
.vai-f__nav a:focus-visible,
.vai-f__legal button:hover,
.vai-f__legal button:focus-visible { background-size: 100% 1px; }
.vai-f__by:hover { color: var(--cream); }
.vai-f a:focus-visible,
.vai-f button:focus-visible { outline: 2px solid var(--cream); outline-offset: 4px; }
.vai-f__mark { margin-top: 64px; }
.vai-f__legal {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 24px;
  padding: 22px 0 28px;
  border-top: 1px solid var(--line);
  color: var(--dim);
  font: 400 12px / 1.5 'IBM Plex Mono', ui-monospace, monospace;
}
.vai-f__legal p { margin: 0; }
.vai-f__legal button {
  padding: 0;
  border: 0;
  background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat;
  color: var(--cream);
  font: inherit;
  cursor: pointer;
  transition: background-size 0.25s ease;
}
@media (min-width: 640px) {
  .vai-f__nav { grid-template-columns: repeat(4, auto); gap: 0 56px; }
}
@media (min-width: 900px) {
  .vai-f__top { grid-template-columns: minmax(0, 1fr) auto; gap: 80px; padding-top: 64px; }
  .vai-f__mark { margin-top: 72px; }
}
`;

/** `grain` is the same film-grain percentage as the hero's gradient. */
export function VAIFooter({ grain }: { grain: number }) {
  const lenis = useLenis();
  const toTop = () => {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="vai-f">
      <style>{css}</style>
      <VAIGradientBackground src={pageBg} grain={grain} focus={GRADIENT_FOCUS} />
      <div className="vai-f__edge" aria-hidden="true">
        <VAIDitherEdge color={CREAM} rows={20} />
      </div>
      <div className="vai-f__body">
        <div className="vai-f__top">
          <div>
            <p className="vai-f__lead">The intelligence layer finally on your fleet.</p>
            <a
              className="vai-f__by"
              href="https://volteomaritime.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Volteo Maritime homepage"
            >
              by
              <VolteoLogo color="#f5f4e9" />
            </a>
          </div>
          <nav className="vai-f__nav" aria-label="Footer">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <p className="vai-f__label">{category}</p>
                <ul>
                  {links.map((link) => {
                    const label = typeof link === "string" ? link : link.label;
                    const href = typeof link === "string" ? "#" : link.href;
                    return (
                      <li key={label}>
                        {href.startsWith("/") ? (
                          <Link to={href}>{label}</Link>
                        ) : (
                          <a href={href} target="_blank" rel="noreferrer">
                            {label}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="vai-f__mark" aria-hidden="true">
          <VAIDitherMark color={CREAM} />
        </div>
        <div className="vai-f__legal">
          <p>© {new Date().getFullYear()} Volteo Maritime Pte Limited. All rights reserved.</p>
          <button type="button" onClick={toTop}>
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
