import { useRef, useState } from "react";
import card from "./assets/medsol-card.png";
import bottle from "./assets/yumvit-bottle.png";
import { useCart } from "./cart";
import { getProduct, money } from "./products";
import { FORMULA } from "./formula";
import { Link, navigate, scrollToId } from "./router";
import { Reveal, CountUp, Bear } from "./fx";
import { STORE_EMAIL as EMAIL } from "./config";
import VideoAds from "./VideoAds";

const FAQS = [
  ["What is Yumvit Kids Multivitamin Gummies?", "A strawberry-flavored multivitamin gummy for children, made with a halal pectin base by MEDSOL Pharmaceutical Pvt. Ltd. Each bottle holds 30 gummies."],
  ["What does one serving contain?", "One serving is 2 gummies, with vitamins A, C, D3, E, B6, B12, folic acid, zinc and iodine. The exact amounts are in the formula section on this page."],
  ["Is Yumvit halal and gelatin free?", "Yes. Yumvit uses a halal pectin base. It contains no gelatin and no artificial color."],
  ["What is the age guidance?", "Yumvit is made for children 4+ years. Follow the serving size and directions on the pack, do not exceed the recommended dose, and ask your child's doctor if you're unsure."],
  ["How much does it cost, and how do I order?", "The price is on the shop page. Add Yumvit to your bag, fill in the checkout form and send your order on WhatsApp or email. We confirm delivery with you, and payment is cash on delivery."],
  ["How do I contact MEDSOL Pharmaceutical?", `Email ${EMAIL}. Our head office is at Shalimar View Housing Scheme, Sultan Mehmood Road, Lahore.`],
];

const REASONS = [
  ["Immunity support", "Vitamin C, D3 aur Zinc bachon ke immune system ko support karte hain.", "Vitamin C, D3 and zinc support a healthy immune system."],
  ["Height & bones", "Vitamin D3 aur Zinc haddiyon aur healthy growth ko support karte hain.", "Vitamin D3 and zinc support strong bones and normal growth."],
  ["Brain & focus", "B12, Iodine aur Vitamin E brain development aur school mein focus ko support karte hain.", "B12, iodine and vitamin E support brain development."],
  ["Picky-eater friendly", "Khana kam khane wale bachon ke liye ek mazedaar daily habit, Zinc aur B vitamins ke saath.", "A tasty daily habit for kids who skip meals, with zinc and B vitamins."],
  ["100% halal pectin", "Gelatin free. Bache khushi se khayenge, aap befikar rahein.", "A halal pectin base with no gelatin and no artificial color."],
];

const MARQUEE = ["Strawberry flavor", "Halal pectin", "No gelatin", "No artificial color", "9 vitamins & minerals", "For kids 4+", "From MEDSOL, Lahore"];

function Hero() {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    el.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };
  const words = ["Strawberry", "gummies", "kids", "ask", "for."];
  return (
    <section id="home" className="hero" ref={ref} onPointerMove={onMove}>
      <div className="orb o1" aria-hidden="true" />
      <div className="orb o2" aria-hidden="true" />
      <div className="orb o3" aria-hidden="true" />
      <Bear className="b1" color="#b79cff" shade="#5b21b6" />
      <Bear className="b2" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="pill"><i />Yumvit · Kids multivitamin gummies</p>
          <h1 className="display" aria-label="Strawberry gummies kids ask for.">
            {words.map((w, i) => (
              <span key={i} className={`w ${i >= 2 ? "em" : ""}`} style={{ "--i": i }} aria-hidden="true">{w}</span>
            ))}
          </h1>
          <p className="lead">
            A halal pectin multivitamin with 9 vitamins and minerals, made for children 4+. Mazedaar daily nutrition, aur parents ka bharosa.
          </p>
          <div className="btn-row">
            <button className="btn dark" onClick={() => navigate("/shop")}>Shop now <i className="arrow">→</i></button>
            <button className="btn outline" onClick={() => scrollToId("formula")}>See the formula</button>
          </div>
          <ul className="trust">
            <li>Halal pectin</li>
            <li>No gelatin</li>
            <li>No artificial color</li>
          </ul>
        </div>
        <div className="hero-art">
          <div className="disc" aria-hidden="true" />
          <div className="orbit">
            <span className="sweep" aria-hidden="true" />
            <span className="chip c-a">Vitamin D3 · 600 IU</span>
            <span className="chip c-b">Halal pectin</span>
            <span className="chip c-c">9 vitamins &amp; minerals</span>
            <span className="chip c-d">No artificial color</span>
          </div>
          <div className="layer">
            <img className="bottle" src={bottle} alt="Yumvit Kids Multivitamin Gummies bottle, strawberry flavor, 30 gummies" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const row = (k) => (
    <div className="marquee-row" aria-hidden={k > 0}>
      {[...MARQUEE, ...MARQUEE].map((t, i) => (
        <span key={`${k}-${i}`}>{t}<b className="star">✦</b></span>
      ))}
    </div>
  );
  return (
    <div className="marquee" role="presentation">
      <div className="marquee-track">{row(0)}{row(1)}</div>
    </div>
  );
}

function Reasons() {
  return (
    <section id="why" className="section benefits">
      <div className="container why-grid">
        <Reveal className="why-head">
          <p className="eyebrow">Why parents say yes</p>
          <h2 className="big-title">Five reasons to say <em>yum</em></h2>
          <p className="muted">Nutrition parents can understand, in a gummy kids actually enjoy.</p>
        </Reveal>
        <div className="why-list">
          {REASONS.map(([title, urdu, en], i) => (
            <Reveal key={title} delay={i * 80}>
              <article className="why-row">
                <span className="why-num">0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p className="urdu">{urdu}</p>
                  <p className="en">{en}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Formula() {
  return (
    <section id="formula" className="section formula">
      <div className="container">
        <Reveal className="head-left">
          <p className="eyebrow light">Final formula</p>
          <h2 className="big-title light">Per 2 gummies<br /><em>(1 serving)</em></h2>
        </Reveal>
        <div className="f-grid">
          {FORMULA.map((f, i) => (
            <Reveal key={f.tag} delay={(i % 3) * 90}>
              <div className="f-tile">
                <span className="f-letter">{f.tag}</span>
                <p className="f-name">{f.name}</p>
                <p className="f-num">
                  <CountUp to={f.num} decimals={String(f.num).includes(".") ? 1 : 0} />
                  <small>{f.unit}{f.extra ? ` ${f.extra}` : ""}</small>
                </p>
                <p className="f-benefit">{f.benefit}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="chips" delay={120}>
          {["Pectin base (halal)", "No gelatin", "No artificial color", "Sugar coated", "Strawberry flavor"].map((c) => (
            <span key={c}>{c}</span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Versus() {
  const good = ["Halal pectin base", "No gelatin", "No artificial color", "Real strawberry flavor kids love"];
  const bad = ["Gelatin base", "Halal status often unclear", "Artificial colors added"];
  return (
    <section className="section versus">
      <div className="container">
        <Reveal className="head-center">
          <p className="eyebrow">Read the label</p>
          <h2 className="big-title">Yumvit <em>vs</em> many gummies</h2>
        </Reveal>
        <Reveal className="vs-grid" delay={100}>
          <div className="vs-side good">
            <h3>Yumvit</h3>
            <ul>{good.map((t) => <li key={t}><b>✓</b>{t}</li>)}</ul>
          </div>
          <div className="vs-badge" aria-hidden="true">VS</div>
          <div className="vs-side bad">
            <h3>Many gummies</h3>
            <ul>{bad.map((t) => <li key={t}><b>✕</b>{t}</li>)}</ul>
          </div>
        </Reveal>
        <p className="fine center-text">Always check the label of any supplement you give your child.</p>
      </div>
    </section>
  );
}

function Showcase() {
  const { add, openCart } = useCart();
  const product = getProduct("yumvit-strawberry");
  const [qty, setQty] = useState(1);
  return (
    <section id="product" className="section showcase">
      <div className="container sc-grid">
        <Reveal className="sc-art">
          <div className="sc-blob" aria-hidden="true" />
          <img className="sc-bottle" src={bottle} alt="Yumvit Kids Multivitamin Gummies bottle" />
          <Bear className="sc-bear s1" />
          <Bear className="sc-bear s2" color="#b79cff" shade="#5b21b6" />
        </Reveal>
        <Reveal delay={120} className="buy">
          <div className="tags"><span>Strawberry flavor</span><span>30 gummies</span><span>Halal pectin</span></div>
          <h2 className="product-title">{product.name}</h2>
          <p className="price big">{money(product.price)}</p>
          <ul className="ticks">{product.points.map((t) => <li key={t}>{t}</li>)}</ul>
          <div className="buy-row">
            <div className="qty" role="group" aria-label="Quantity">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">−</button>
              <span aria-live="polite">{qty}</span>
              <button onClick={() => setQty(qty + 1)} aria-label="Increase quantity">+</button>
            </div>
            <button className="btn dark" onClick={() => { add(product.id, qty); setQty(1); }}>Add to bag <i className="arrow">→</i></button>
            <button className="btn outline" onClick={openCart}>View bag</button>
          </div>
          <p className="fine">Cash on delivery. Order by WhatsApp or email, we confirm before dispatch. <Link to={`/product/${product.id}`}>Full product page</Link></p>
        </Reveal>
      </div>
      <div className="container know">
        {[
          ["Serving", "2 gummies = 1 serving. 15 servings per bottle."],
          ["Age", "Made for children 4+ years. Do not exceed the recommended dose."],
          ["Storage", "Store in a cool, dry place. Keep out of reach of children."],
        ].map(([t, d], i) => (
          <Reveal key={t} delay={i * 90}>
            <div className="know-card"><h3>{t}</h3><p>{d}</p></div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about">
      <div className="container about-grid">
        <Reveal className="about-card">
          <img src={card} alt="MEDSOL Pharmaceutical Private Limited Lahore business card with head office address" />
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow">About MEDSOL</p>
          <h2 className="big-title sm">Made in Lahore, made with care</h2>
          <p>
            MEDSOL Pharmaceutical Pvt. Ltd. is headquartered in Lahore, Pakistan. We bring family-friendly products to market
            with transparent information, responsible labeling and dependable customer care.
          </p>
          <p>With Yumvit our goal is simple: a product kids enjoy, a label parents can read, and a team that answers questions directly.</p>
        </Reveal>
      </div>
    </section>
  );
}

function Faqs() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faqs" className="section faqs">
      <div className="container narrow">
        <Reveal className="head-left">
          <p className="eyebrow">FAQs</p>
          <h2 className="big-title sm">Questions?</h2>
        </Reveal>
        <div className="acc">
          {FAQS.map(([q, a], i) => (
            <div key={q} className={`acc-item ${open === i ? "open" : ""}`}>
              <h3>
                <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  {q}<span className="plus" aria-hidden="true" />
                </button>
              </h3>
              {open === i && <p>{a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter a valid email address.";
    if (form.message.trim().length < 5) err.message = "Tell us how we can help.";
    setErrors(err);
    if (Object.keys(err).length === 0) {
      const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Yumvit inquiry")}&body=${encodeURIComponent(body)}`;
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container contact-grid">
        <Reveal>
          <p className="eyebrow light">Contact</p>
          <h2 className="big-title light sm">Say hello to MEDSOL</h2>
          <p className="light-text">Product questions, orders or distribution inquiries. We're happy to help.</p>
          <dl className="contact-list">
            <div><dt>Email</dt><dd><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd></div>
            <div><dt>Head office</dt><dd>Shalimar View Housing Scheme, Sultan Mehmood Road, Lahore</dd></div>
            <div><dt>Facebook and Instagram</dt><dd>Medsol pharmaceutical</dd></div>
          </dl>
        </Reveal>
        <Reveal delay={120}>
          <form className="form" onSubmit={submit} noValidate>
            <h3>Send an inquiry</h3>
            {sent && <p className="ok" role="status">Your email app should open with the message ready to send.</p>}
            <label>Name
              <input value={form.name} onChange={set("name")} autoComplete="name" aria-invalid={!!errors.name} />
              {errors.name && <span className="err">{errors.name}</span>}
            </label>
            <label>Email
              <input type="email" value={form.email} onChange={set("email")} autoComplete="email" aria-invalid={!!errors.email} />
              {errors.email && <span className="err">{errors.email}</span>}
            </label>
            <label>Message
              <textarea rows="4" value={form.message} onChange={set("message")} aria-invalid={!!errors.message} />
              {errors.message && <span className="err">{errors.message}</span>}
            </label>
            <button className="btn dark" type="submit">Send inquiry <i className="arrow">→</i></button>
            <p className="fine">This opens your email app with your message filled in.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export default function Landing() {
  return (
    <>
      <Hero />
      <Marquee />
      <Reasons />
      <Formula />
      <Versus />
      <VideoAds />
      <Showcase />
      <About />
      <Faqs />
      <Contact />
    </>
  );
}
