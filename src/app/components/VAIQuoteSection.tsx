import photo from "@/assets/vai-venkata.png";
import signature from "@/assets/vai-signature.png";

// From 900px up everything is positioned in the mockup's own pixel space (1700 x 1046: the 1512px frame at 1.124x) and
// scales to fit the screen-tall section, so the whole card stays in view. The quote is OldStyle 1 and the name IBM Plex
// Mono, sized and tracked to match the mockup's measured ink. Below 900px the photo and the card stack with fixed sizes.
const W = 1700;
const H = 1046;

const css = `
.vai-q {
  --rule: rgba(0, 0, 0, 0.25);
  display: grid;
  place-items: center;
  min-height: 100vh;
  min-height: 100svh;
  padding: 56px 20px;
  background: #f5f4e9;
  color: #000;
}
.vai-q__frame { width: min(100%, 520px); margin: 0; }
.vai-q__photo { display: block; width: 100%; aspect-ratio: 4 / 5; object-fit: cover; object-position: center top; }
.vai-q__card {
  padding: 28px 24px 32px;
  box-shadow: inset 1px 0 0 var(--rule), inset -1px 0 0 var(--rule), inset 0 -1px 0 var(--rule);
}
.vai-q__quote {
  margin: 0;
  font: 400 26px/1.25 'OldStyle 1', 'Amiri Quran', Georgia, serif;
  letter-spacing: -0.0167em;
}
.vai-q__br { display: none; }
.vai-q__sign { display: block; width: 150px; height: auto; margin: 22px 0 0 -6px; }
.vai-q__who {
  margin-top: 14px;
  font: 400 14px/1.9 'IBM Plex Mono', ui-monospace, monospace;
  letter-spacing: 0.022em;
  color: #848479;
}
.vai-q__who span { display: block; }

@media (min-width: 900px) {
  .vai-q {
    container-type: size;
    height: 100vh;
    height: 100svh;
    min-height: min(44vw, 700px);
    padding: 0;
  }
  .vai-q__frame {
    --u: min(100cqw / ${W}, 100cqh / ${H});
    position: relative;
    width: calc(var(--u) * ${W});
    height: calc(var(--u) * ${H});
  }
  .vai-q__photo {
    position: absolute;
    left: calc(var(--u) * 77);
    top: calc(var(--u) * 92);
    width: calc(var(--u) * 539.1);
    height: calc(var(--u) * 873);
    aspect-ratio: auto;
    object-fit: fill;
  }
  .vai-q__card {
    position: absolute;
    left: calc(var(--u) * 616.1);
    top: calc(var(--u) * 92);
    width: calc(var(--u) * 941.9);
    height: calc(var(--u) * 871);
    padding: 0;
    box-shadow: inset 0 1px 0 var(--rule), inset -1px 0 0 var(--rule), inset 0 -1px 0 var(--rule);
  }
  .vai-q__quote {
    position: absolute;
    left: calc(var(--u) * 82.4);
    top: calc(var(--u) * 61.6);
    font-size: calc(var(--u) * 45.26);
    line-height: calc(var(--u) * 56.45);
    white-space: nowrap;
  }
  .vai-q__br { display: inline; }
  .vai-q__sign {
    position: absolute;
    left: calc(var(--u) * 72);
    top: calc(var(--u) * 577);
    width: calc(var(--u) * 180);
    margin: 0;
  }
  .vai-q__who {
    position: absolute;
    left: calc(var(--u) * 81);
    top: calc(var(--u) * 698.46);
    margin: 0;
    font-size: calc(var(--u) * 17.99);
    line-height: calc(var(--u) * 35);
  }
}
`;

export function VAIQuoteSection() {
  return (
    <section className="vai-q">
      <style>{css}</style>
      <figure className="vai-q__frame">
        <img className="vai-q__photo" src={photo} alt="Venkata Raja" />
        <div className="vai-q__card">
          <blockquote className="vai-q__quote">
            We are building practical <br className="vai-q__br" />
            intelligence for shipping, rooted in <br className="vai-q__br" />
            the real challenges of crews, <br className="vai-q__br" />
            operators and owners. It’s AI <br className="vai-q__br" />
            designed to make every voyage <br className="vai-q__br" />
            safer, cleaner and more efficient, <br className="vai-q__br" />
            and to always keep people in <br className="vai-q__br" />
            command.
          </blockquote>
          <img className="vai-q__sign" src={signature} alt="" />
          <figcaption className="vai-q__who">
            <span>Venkata Raja</span>
            <span>Head of Product, Volteo AI</span>
          </figcaption>
        </div>
      </figure>
    </section>
  );
}
