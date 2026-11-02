import { useState } from "react";
import logo from "./assets/medsol-logo.png";
import { useCart } from "./cart";
import { money } from "./products";
import { STORE_EMAIL, FREE_DELIVERY_OVER, MAX_QTY, SOCIAL, WHATSAPP_NUMBER } from "./config";
import { Link, navigate, goSection } from "./router";

export function Header({ path }) {
  const { count, openCart } = useCart();
  const [open, setOpen] = useState(false);
  const section = (id) => () => {
    setOpen(false);
    goSection(id);
  };
  const page = (to) => () => {
    setOpen(false);
    navigate(to);
  };
  return (
    <header className="header">
      <div className="container header-row">
        <Link to="/" className="brand" aria-label="MEDSOL Pharmaceutical, home">
          <img src={logo} alt="MEDSOL Pharmaceutical Private Limited Lahore" />
        </Link>
        <nav className={`nav ${open ? "open" : ""}`} aria-label="Main">
          <button onClick={page("/")} aria-current={path === "/" ? "page" : undefined}>Home</button>
          <button onClick={page("/shop")} aria-current={path.startsWith("/shop") || path.startsWith("/product") ? "page" : undefined}>Shop</button>
          <button onClick={section("about")}>About</button>
          <button onClick={section("faqs")}>FAQs</button>
          <button onClick={section("contact")}>Contact</button>
        </nav>
        <div className="header-actions">
          <button className="bag-btn" onClick={openCart} aria-label={`Open bag, ${count} items`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 7h12l1 13H5L6 7Z" />
              <path d="M9 7a3 3 0 0 1 6 0" />
            </svg>
            {count > 0 && <span className="badge">{count}</span>}
          </button>
          <button className="menu-btn" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}

const ICONS = {
  facebook: <path d="M14 8.5h3V4.5h-3.2C10.9 4.5 9.5 6.3 9.5 8.8V11H7v4h2.5v6.5h4V15h3l.8-4h-3.8V9.2c0-.5.2-.7.5-.7z" />,
  tiktok: <path d="M16.2 3h-3.3v11.6a2.6 2.6 0 1 1-2.6-2.6c.3 0 .6 0 .8.1V8.7a6 6 0 1 0 5.1 5.9V9.4a7.4 7.4 0 0 0 4.2 1.3V7.4c-2.3-.2-4.1-2-4.2-4.4z" />,
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="16.8" cy="7.2" r="1.2" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M12 3.4a8.6 8.6 0 0 0-7.4 13l-1.1 4.1 4.2-1.1A8.6 8.6 0 1 0 12 3.4z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9.3 7.9c.2-.4.5-.4.7-.4h.4c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.1.2-.1.3 0 .5.5 1 1.4 1.8 2.5 2.4.2.1.4.1.5-.1l.6-.7c.2-.2.4-.2.6-.1l1.6.8c.2.1.3.3.3.5 0 .9-.7 1.7-1.6 1.9-.9.2-2.4 0-4.4-1.5-1.8-1.4-2.8-3.1-3.1-4.2-.2-.8.1-1.8.7-2.4z" />
    </>
  ),
};
const LABELS = { facebook: "Facebook", tiktok: "TikTok", instagram: "Instagram", whatsapp: "WhatsApp" };

// Used only while a link is still empty in config.js, so the icons are always visible.
const FALLBACK = {
  facebook: "https://www.facebook.com/search/top?q=Medsol%20pharmaceutical",
  instagram: "https://www.instagram.com/",
  tiktok: "https://www.tiktok.com/search?q=Medsol%20pharmaceutical",
};

function Social() {
  const items = ["facebook", "instagram", "tiktok"].map((name) => [name, SOCIAL[name] || FALLBACK[name]]);
  // WhatsApp link is built from WHATSAPP_NUMBER in config.js (hidden while it is still the placeholder)
  if (WHATSAPP_NUMBER && WHATSAPP_NUMBER !== "923000000000") items.push(["whatsapp", `https://wa.me/${WHATSAPP_NUMBER}`]);
  return (
    <div className="social">
      <h4>Follow us</h4>
      <div className="social-row">
        {items.map(([name, url]) => (
          <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name === "whatsapp" ? "Chat with us on WhatsApp" : `Yumvit on ${LABELS[name]}`}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">{ICONS[name]}</svg>
          </a>
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <img className="footer-logo" src={logo} alt="MEDSOL Pharmaceutical" />
          <p>A Pakistan-based pharmaceutical company focused on family-friendly products, transparent information and dependable customer care. Home of Yumvit Kids Multivitamin Gummies.</p>
        </div>
        <div>
          <h4>Quick links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><button onClick={() => goSection("about")}>About</button></li>
            <li><button onClick={() => goSection("faqs")}>FAQs</button></li>
            <li><button onClick={() => goSection("contact")}>Contact</button></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href={`mailto:${STORE_EMAIL}`}>{STORE_EMAIL}</a></li>
            <li>Shalimar View Housing Scheme, Sultan Mehmood Road, Lahore</li>
          </ul>
          <Social />
        </div>
      </div>
      <div className="container">
        <p className="disclaimer">
          <strong>Important product information:</strong> Yumvit Kids Multivitamin Gummies is a dietary (food) supplement and is not
          a substitute for a varied, balanced diet and a healthy lifestyle. The full ingredient list, nutrition information, usage
          directions and age guidance are printed on the packaging. Please read the pack before use. Keep out of reach of small
          children and store as directed. This website is for general product information only and is not medical advice. Consult a
          healthcare professional before giving any supplement to children. Prices and availability are subject to change.
        </p>
        <p className="copy">© {new Date().getFullYear()} MEDSOL Pharmaceutical Pvt. Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
}

export function CartDrawer() {
  const { open, closeCart, lines, subtotal, delivery, total, setQty, remove, clear } = useCart();
  const go = (to) => {
    closeCart();
    navigate(to);
  };
  const toFree = FREE_DELIVERY_OVER > 0 ? FREE_DELIVERY_OVER - subtotal : 0;

  return (
    <>
      <div className={`scrim ${open ? "show" : ""}`} onClick={closeCart} />
      <aside className={`drawer ${open ? "show" : ""}`} aria-hidden={!open} aria-label="Shopping bag">
        <div className="drawer-head">
          <h3>Your bag</h3>
          <button onClick={closeCart} aria-label="Close bag">✕</button>
        </div>
        {lines.length === 0 ? (
          <div className="empty">
            <p>Your bag is empty.</p>
            <button className="btn primary" onClick={() => go("/shop")}>Go to the shop</button>
          </div>
        ) : (
          <div className="drawer-body">
            {lines.map((l) => (
              <div className="line" key={l.id}>
                <img src={l.images[0]} alt="" />
                <div>
                  <strong>{l.name}</strong>
                  <span>{l.flavor} · {l.size}</span>
                  <span>{money(l.price)} each</span>
                  <div className="qty small">
                    <button onClick={() => setQty(l.id, l.qty - 1)} aria-label="Decrease quantity">−</button>
                    <span>{l.qty}</span>
                    <button onClick={() => setQty(l.id, l.qty + 1)} aria-label="Increase quantity" disabled={l.qty >= MAX_QTY}>+</button>
                  </div>
                  <button className="link left" onClick={() => remove(l.id)}>Remove</button>
                </div>
              </div>
            ))}
            <dl className="totals">
              <div><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
              <div><dt>Delivery</dt><dd>{delivery === 0 ? "Free" : money(delivery)}</dd></div>
              <div className="grand"><dt>Total</dt><dd>{money(total)}</dd></div>
            </dl>
            {toFree > 0 && <p className="fine">Add {money(toFree)} more for free delivery.</p>}
            <button className="btn primary wide" onClick={() => go("/checkout")}>Checkout</button>
            <button className="link" onClick={clear}>Clear bag</button>
          </div>
        )}
      </aside>
    </>
  );
}
