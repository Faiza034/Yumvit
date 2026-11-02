import { WHATSAPP_NUMBER, STORE_EMAIL } from "./config";
import { money } from "./products";

const KEY = "yumvit-last-order";

export function newOrderId() {
  return "YV-" + Date.now().toString(36).toUpperCase();
}

export function saveOrder(order) {
  try {
    localStorage.setItem(KEY, JSON.stringify(order));
  } catch {
    /* ignore */
  }
}

export function loadOrder() {
  try {
    return JSON.parse(localStorage.getItem(KEY));
  } catch {
    return null;
  }
}

export function buildMessage(o) {
  const c = o.customer;
  return [
    `New order ${o.id}`,
    "",
    ...o.lines.map((l) => `- ${l.name} (${l.size}) x ${l.qty} = ${money(l.price * l.qty)}`),
    "",
    `Subtotal: ${money(o.subtotal)}`,
    `Delivery: ${o.delivery === 0 ? "Free" : money(o.delivery)}`,
    `Total: ${money(o.total)}`,
    "Payment: Cash on delivery",
    "",
    `Name: ${c.name}`,
    `Phone: ${c.phone}`,
    c.email ? `Email: ${c.email}` : null,
    `City: ${c.city}`,
    `Address: ${c.address}`,
    c.notes ? `Notes: ${c.notes}` : null,
  ]
    .filter((x) => x !== null)
    .join("\n");
}

export const whatsappUrl = (o) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage(o))}`;

// mailto: opens the phone's mail app (or the computer's default mail program)
export const emailUrl = (o) =>
  `mailto:${STORE_EMAIL}?subject=${encodeURIComponent("New order " + o.id)}&body=${encodeURIComponent(buildMessage(o))}`;

// Gmail in the browser, with the store address already in the "To" box
export const gmailUrl = (o) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(STORE_EMAIL)}&su=${encodeURIComponent("New order " + o.id)}&body=${encodeURIComponent(buildMessage(o))}`;

export const isMobile = () => typeof navigator !== "undefined" && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

// Phones use the mail app; computers open Gmail in a new tab (works even without a mail program installed)
export const emailLink = (o) => (isMobile() ? emailUrl(o) : gmailUrl(o));
export const openEmail = (o) => {
  if (isMobile()) window.location.href = emailUrl(o);
  else window.open(gmailUrl(o), "_blank", "noopener");
};
