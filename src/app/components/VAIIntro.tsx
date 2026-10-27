import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

// The clip is 1920x1080 on a flat cream, so the overlay is the same colour and its edges never show.
const CLIP_BG = "#ecebe4";
const FADE_MS = 800;
const START_TIMEOUT_MS = 4000; // give up on a clip that has not started playing by then
const MAX_MS = 12000; // and never hold the page for longer than this

// Covers the screen like background-size: cover, but never scaled so far that the closing "by volteo" (a quarter of the
// frame wide, a little left of centre) would be cut off on a narrow phone; the cream overlay fills in around it. Browsers
// decode the clip's cream a level or two off the overlay's, so the top and bottom edges are feathered into it (the clip
// is empty cream there) rather than left as a visible band.
const FEATHER = "linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent)";
const clipStyle = {
  position: "absolute",
  left: "50%",
  top: "50%",
  width: "min(max(100cqw, calc(100cqh * 16 / 9)), 300cqw)",
  maxWidth: "none", // the CSS reset caps video at the width of its container
  aspectRatio: "16 / 9",
  transform: "translate(-50%, -50%)",
  maskImage: FEATHER,
  WebkitMaskImage: FEATHER,
  transition: "opacity 200ms ease",
} as const;

/**
 * Plays the intro clip over the page while it loads, then fades out and calls `onDone`, which is when the page's own
 * entrance should begin. A click or Esc skips it, and a clip that cannot play never holds the page.
 */
export function VAIIntro({ src, onDone }: { src: string; onDone: () => void }) {
  const lenis = useLenis();
  const videoRef = useRef<HTMLVideoElement>(null);
  const finished = useRef(false);
  const [shown, setShown] = useState(false); // the first frame is on screen
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    setLeaving(true);
    onDone();
  }, [onDone]);

  // The page stays put behind the clip.
  useEffect(() => {
    if (!lenis || leaving) return;
    lenis.stop();
    return () => lenis.start();
  }, [lenis, leaving]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true; // autoplay needs it, and the clip has no sound
    video.play().catch(finish);
    const startTimer = window.setTimeout(() => {
      if (video.currentTime === 0) finish();
    }, START_TIMEOUT_MS);
    const maxTimer = window.setTimeout(finish, MAX_MS);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(maxTimer);
      window.removeEventListener("keydown", onKey);
    };
  }, [finish]);

  useEffect(() => {
    if (!leaving) return;
    const t = window.setTimeout(() => setGone(true), FADE_MS + 100);
    return () => window.clearTimeout(t);
  }, [leaving]);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      onClick={finish}
      className="fixed inset-0 z-[9999] overflow-hidden"
      style={{
        background: CLIP_BG,
        containerType: "size",
        opacity: leaving ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease`,
        pointerEvents: leaving ? "none" : "auto",
      }}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setShown(true)}
        onPlaying={() => setShown(true)}
        onEnded={finish}
        onError={finish}
        style={{ ...clipStyle, opacity: shown ? 1 : 0 }}
      />
    </div>
  );
}
