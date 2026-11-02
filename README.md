# Yumvit Kids Multivitamin Gummies: Online Store

A frontend-only React website and store for **Yumvit Kids Multivitamin Gummies** by MEDSOL Pharmaceutical Pvt. Ltd., Lahore.

- Pages: Home, Shop, Product, Checkout, Order confirmation
- Cart saved in the visitor's browser
- Orders are sent by **WhatsApp** or **email** (cash on delivery)
- No backend and no database

---

## 1. What you need

- **Node.js 18 or newer**. Download the LTS version from https://nodejs.org
- A terminal (Command Prompt, PowerShell or Terminal)

Check that Node is installed:

```bash
node -v
npm -v
```

## 2. Run it on your computer

Open a terminal **inside this folder** (the one that contains `package.json`) and run:

```bash
npm install      # first time only: downloads the packages
npm run dev      # starts the website
```

Open the link it prints, usually http://localhost:5173

Press `Ctrl + C` in the terminal to stop it.

| Command           | What it does                                   |
| ----------------- | ---------------------------------------------- |
| `npm install`     | Installs the packages (first time only)        |
| `npm run dev`     | Local preview with live reload                 |
| `npm run build`   | Builds the final site into the `dist` folder   |
| `npm run preview` | Previews the built site locally                |
| `npm run deploy`  | Builds and publishes to GitHub Pages           |

## 3. Edit before going live

All settings are in **`src/config.js`**:

| Setting              | Meaning                                                        |
| -------------------- | -------------------------------------------------------------- |
| `WHATSAPP_NUMBER`    | Your WhatsApp number with country code, digits only (`923001234567`) |
| `STORE_EMAIL`        | Orders and inquiries are sent to this email                    |
| `PRICE_PKR`          | Product price (placeholder, set your real price)               |
| `DELIVERY_FEE`       | Delivery charge                                                |
| `FREE_DELIVERY_OVER` | Free delivery above this amount (`0` turns it off)             |
| `SOCIAL`             | Facebook, TikTok and Instagram page links for the footer       |

The WhatsApp icon in the footer appears automatically once `WHATSAPP_NUMBER` is your real number.

## 4. Common changes

| I want to change...            | Edit this file                          |
| ------------------------------ | --------------------------------------- |
| Vitamins and amounts           | `src/formula.js`                        |
| Home page text and sections    | `src/Landing.jsx`                       |
| Products in the shop           | `src/products.js`                       |
| Colors, fonts, spacing         | `src/index.css` (colors are at the top) |
| Header, footer, cart drawer    | `src/Layout.jsx`                        |
| Shop, product, checkout pages  | `src/pages.jsx`                         |
| Order message text             | `src/orders.js`                         |
| Bottle, logo and card images   | `src/assets/`                           |
| Browser tab icon               | `public/favicon.svg`                    |

### Add video ads

1. Put your MP4 (and a poster image) in `public/videos/`.
2. Add it in `src/videos.js`:

```js
export const VIDEOS = [
  { title: "Strawberry fun with Yumvit", src: file("ad1.mp4"), poster: file("ad1.jpg") },
  { title: "Another ad", youtube: "YOUTUBE_VIDEO_ID", vertical: true },
];
```

Keep MP4 files small (under about 10 MB each) so the site stays fast.

### Add another product

Add an object to `PRODUCTS` in `src/products.js`. It appears in the shop automatically.

## 5. Put it online

### Option A: GitHub Pages

1. In `vite.config.js`, `base` must match the repository name exactly:

```js
export default defineConfig({
  plugins: [react()],
  base: process.env.VERCEL ? "/" : "/Yumvit/",
});
```

2. Install the publishing tool once:

```bash
npm install gh-pages --save-dev
```

3. Make sure `package.json` has these scripts:

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

4. Publish:

```bash
npm run deploy
```

5. On GitHub: **Settings → Pages → Source = Deploy from a branch**, branch **gh-pages**, folder **/ (root)**.

The site will be at `https://YOUR-USERNAME.github.io/Yumvit/`.

### Option B: Vercel

1. Push the project to GitHub.
2. Go to https://vercel.com, sign in with GitHub and choose **Add New → Project**.
3. Import the repository. Vercel detects Vite automatically (Build: `npm run build`, Output: `dist`).
4. Click **Deploy**. Every `git push` updates the site by itself.

### Save your code to GitHub

```bash
git add .
git commit -m "Update site"
git pull --rebase origin main
git push
```

`git push` saves the code. For GitHub Pages, the live site only changes after `npm run deploy`. On Vercel it changes automatically.

## 6. How orders work

Checkout builds the order text and opens WhatsApp or your email, already addressed to your store. On a computer, "Send order by email" opens Gmail in a new tab. On a phone it opens the mail app. The order is not placed until the customer presses send in WhatsApp or email. Nothing is stored on a server.

## 7. Problems and fixes

| Problem | Fix |
| ------- | --- |
| `Cannot find package '@vitejs/plugin-react'` | Run `npm install` inside the project folder |
| `'gh-pages' is not recognized` | Run `npm install gh-pages --save-dev` |
| `Missing script: "deploy"` | Add the `predeploy` and `deploy` scripts from section 5 |
| Live site shows a blank white page | `base` in `vite.config.js` does not match the repository name |
| `git push` rejected (fetch first) | Run `git pull --rebase origin main`, then `git push` |
| Changes not showing on the live site | Run `npm run deploy` (GitHub Pages), then press `Ctrl + F5` |
| Footer WhatsApp icon missing | Put your real number in `WHATSAPP_NUMBER` |
| Favicon not updating | Press `Ctrl + Shift + R`, or open the site in a private window |

## 8. Product and advertising notes

- Yumvit is a dietary supplement. Keep claims on the site, the pack and in videos as "supports" statements, and check them with your regulatory advisor (DRAP) before launch.
- The ingredient amounts on the website must match the printed label.

---

© MEDSOL Pharmaceutical Pvt. Ltd.
