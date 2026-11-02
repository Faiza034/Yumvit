import { useEffect, useRef, useState } from "react";
import { VIDEOS } from "./videos";
import { Reveal } from "./fx";

function Card({ v, onOpen }) {
  const ref = useRef(null);
  const play = () => ref.current?.play().catch(() => {});
  const stop = () => {
    const el = ref.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
  };
  return (
    <button className="vid-card" onClick={() => onOpen(v)} onMouseEnter={play} onMouseLeave={stop} onFocus={play} onBlur={stop} aria-label={`Play video: ${v.title}`}>
      {v.src ? (
        <video ref={ref} src={v.src} poster={v.poster} muted loop playsInline preload="metadata" />
      ) : (
        <img src={v.poster || `https://i.ytimg.com/vi/${v.youtube}/hqdefault.jpg`} alt="" loading="lazy" />
      )}
      <span className="vid-play" aria-hidden="true">▶</span>
      <span className="vid-title">{v.title}</span>
    </button>
  );
}

function Modal({ v, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);
  return (
    <div className="vid-modal" role="dialog" aria-modal="true" aria-label={v.title} onClick={onClose}>
      <div className={`vid-frame ${v.vertical ? "tall" : "wide"}`} onClick={(e) => e.stopPropagation()}>
        <button className="vid-close" onClick={onClose} aria-label="Close video">✕</button>
        {v.src ? (
          <video src={v.src} poster={v.poster} controls autoPlay playsInline />
        ) : (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${v.youtube}?autoplay=1&rel=0`}
            title={v.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}

export default function VideoAds() {
  const [active, setActive] = useState(null);

  if (VIDEOS.length === 0) {
    if (!import.meta.env.DEV) return null;
    return (
      <section className="section videos">
        <div className="container">
          <p className="vid-empty">Dev note: add your ad videos in <code>src/videos.js</code>. This box is hidden on the live site.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="watch" className="section videos">
      <div className="container">
        <Reveal className="head-left">
          <p className="eyebrow">Watch</p>
          <h2 className="big-title">Yumvit<br /><em>in action</em></h2>
        </Reveal>
      </div>
      <div className="vid-row" role="list">
        {VIDEOS.map((v, i) => (
          <Reveal key={v.title + i} delay={i * 90} className="vid-item" role="listitem">
            <Card v={v} onOpen={setActive} />
          </Reveal>
        ))}
      </div>
      {active && <Modal v={active} onClose={() => setActive(null)} />}
    </section>
  );
}
