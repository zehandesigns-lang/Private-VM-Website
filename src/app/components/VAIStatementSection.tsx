// From 1024px up, positions and type follow the Figma frame (1512px wide) and scale with the section width.
// Below that the heading and paragraph stack with fixed sizes.
const css = `
.vai-ms {
  container-type: inline-size;
  background: #f5f4e9;
  color: #000;
  min-height: 100vh;
  min-height: 100svh;
}
.vai-ms__inner { padding: 72px 24px 88px; }
.vai-ms__heading,
.vai-ms__body {
  margin: 0;
  font-family: 'Amiri Quran', 'Amiri', Georgia, serif;
  font-weight: 400;
  line-height: 1;
}
.vai-ms__heading { font-size: 34px; letter-spacing: -0.0166em; }
.vai-ms__body { margin-top: 48px; font-size: 19px; line-height: 1.3; letter-spacing: -0.0074em; }
.vai-ms__br { display: none; }
@media (min-width: 640px) {
  .vai-ms__inner { padding: 96px 48px 112px; }
  .vai-ms__heading { font-size: 44px; max-width: 720px; }
  .vai-ms__body { margin-top: 64px; font-size: 22px; max-width: 560px; }
}
@media (min-width: 1024px) {
  .vai-ms { min-height: max(100svh, 60vw); }
  .vai-ms__inner {
    --u: calc(100cqw / 1512);
    padding: calc(var(--u) * 152) calc(var(--u) * 131) 0 calc(var(--u) * 138);
  }
  .vai-ms__heading { font-size: calc(var(--u) * 52); max-width: none; }
  .vai-ms__body {
    margin: calc(var(--u) * 170) 0 calc(var(--u) * 120) auto;
    width: max-content;
    max-width: 100%;
    font-size: calc(var(--u) * 31.7);
    line-height: 1;
    text-align: right;
  }
  .vai-ms__br { display: inline; }
}
`;

export function VAIStatementSection() {
  return (
    <section className="vai-ms">
      <style>{css}</style>
      <div className="vai-ms__inner">
        <h2 className="vai-ms__heading">
          At Volteo AI, we’re building the <br className="vai-ms__br" />
          intelligence layer for the world’s fleets, <br className="vai-ms__br" />
          with the people who run them at the <br className="vai-ms__br" />
          center of every decision
        </h2>
        <p className="vai-ms__body">
          Maritime Intelligence means building AI from the real data <br className="vai-ms__br" />
          ships record every day, designed to stay accurate, explainable, <br className="vai-ms__br" />
          and firmly in service of the people who run them.
        </p>
      </div>
    </section>
  );
}
