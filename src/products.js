import bottle from "./assets/yumvit-bottle.png";
import { PRICE_PKR } from "./config";

// Add more products here and they appear in the shop automatically.
export const PRODUCTS = [
  {
    id: "yumvit-strawberry",
    name: "Yumvit Kids Multivitamin Gummies",
    flavor: "Strawberry",
    size: "30 gummies",
    price: PRICE_PKR,
    images: [bottle],
    short: "Halal pectin strawberry gummies with 9 vitamins and minerals, made for kids 4+.",
    points: [
      "Strawberry flavor kids look forward to",
      "Halal pectin base. No gelatin, no artificial color",
      "Vitamins A, C, D3, E, B6, B12, folic acid, zinc and iodine",
      "30-gummy bottle: 15 servings of 2 gummies",
      "Made by MEDSOL Pharmaceutical, Lahore",
    ],
  },
];

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
export const money = (n) => `Rs ${Number(n).toLocaleString("en-PK")}`;
