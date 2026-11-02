import { useEffect, useRef, useState } from "react";

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Fade/slide in when scrolled into view */
export function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window) || reduced()) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setShown(true);
        io.disconnect();
      }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`} style={{ "--d": `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

/* Number that counts up when visible */
export function CountUp({ to, decimals = 0, duration = 1400 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    const run = () => {
      if (reduced()) return setVal(to);
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / duration);
        setVal(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    if (!("IntersectionObserver" in window)) {
      setVal(to);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        run();
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);
  return <span ref={ref}>{val.toFixed(decimals)}</span>;
}

/* Thin purple progress bar at the top of the page */
export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? Math.min(1, window.scrollY / h) : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);
  return <div className="progress" style={{ transform: `scaleX(${p})` }} aria-hidden="true" />;
}

/* Gummy bear drawn in SVG */
export function Bear({ className = "", style, color = "#7a4cf0", shade = "#4b25b5" }) {
  return (
    <svg className={`bear ${className}`} style={style} viewBox="0 0 100 124" aria-hidden="true">
      <circle cx="24" cy="22" r="13" fill={color} />
      <circle cx="76" cy="22" r="13" fill={color} />
      <circle cx="24" cy="22" r="6.5" fill={shade} opacity=".55" />
      <circle cx="76" cy="22" r="6.5" fill={shade} opacity=".55" />
      <ellipse cx="22" cy="80" rx="9" ry="17" fill={color} transform="rotate(-24 22 80)" />
      <ellipse cx="78" cy="80" rx="9" ry="17" fill={color} transform="rotate(24 78 80)" />
      <ellipse cx="36" cy="109" rx="12" ry="10" fill={color} />
      <ellipse cx="64" cy="109" rx="12" ry="10" fill={color} />
      <ellipse cx="50" cy="86" rx="27" ry="28" fill={color} />
      <circle cx="50" cy="40" r="29" fill={color} />
      <ellipse cx="50" cy="88" rx="14" ry="16" fill="#fff" opacity=".14" />
      <ellipse cx="50" cy="49" rx="12" ry="9" fill="#fff" opacity=".28" />
      <circle cx="40" cy="35" r="3" fill="#1b1038" />
      <circle cx="60" cy="35" r="3" fill="#1b1038" />
      <ellipse cx="50" cy="45" rx="3.4" ry="2.4" fill="#1b1038" />
      <ellipse cx="36" cy="20" rx="9" ry="4.5" fill="#fff" opacity=".5" transform="rotate(-28 36 20)" />
      <ellipse cx="30" cy="70" rx="4" ry="9" fill="#fff" opacity=".35" transform="rotate(14 30 70)" />
    </svg>
  );
}

/* Paint drips hanging from the top of a section */
const DRIPS = [
  { x: 90, w: 34, len: 60 }, { x: 210, w: 22, len: 112 }, { x: 330, w: 30, len: 44 },
  { x: 470, w: 40, len: 98 }, { x: 610, w: 24, len: 68 }, { x: 740, w: 34, len: 132 },
  { x: 880, w: 26, len: 54 }, { x: 1010, w: 38, len: 92 }, { x: 1150, w: 24, len: 122 },
  { x: 1270, w: 32, len: 60 }, { x: 1380, w: 26, len: 86 },
];

function dripPath(base = 34, W = 1440) {
  let d = `M0 0 V${base}`;
  DRIPS.forEach(({ x, w, len }) => {
    const l = x - w / 2;
    const r = x + w / 2;
    d += ` H${l - 16} Q${l} ${base} ${l} ${base + 16} V${base + len - w / 2}`;
    d += ` A${w / 2} ${w / 2} 0 0 0 ${r} ${base + len - w / 2}`;
    d += ` V${base + 16} Q${r} ${base} ${r + 16} ${base}`;
  });
  return d + ` H${W} V0 Z`;
}

export function Drip({ color = "var(--purple)", drops = true }) {
  return (
    <svg className="drip" viewBox="0 0 1440 176" aria-hidden="true">
      <path d={dripPath()} fill={color} />
      {drops && (
        <>
          <circle className="drop" cx="740" cy="170" r="8" fill={color} />
          <circle className="drop d2" cx="210" cy="150" r="6" fill={color} />
          <circle className="drop d3" cx="1150" cy="160" r="7" fill={color} />
        </>
      )}
    </svg>
  );
}


