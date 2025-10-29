
import type { Product } from "@/types/product";

const COLORS = ["Đen", "Trắng", "Xanh", "Be", "Nâu"];
const SIZES = ["S", "M", "L", "XL"];
const BRANDS = ["Acme", "Contoso", "Umbra", "Nova"];

export const PRODUCTS: Product[] = Array.from({ length: 30 }, (_, i) => {
  const n = i + 1;
  const discounts: Record<number, number> = { 3: 10, 5: 50, 7: 30 };
  const Image = [
    '/image/image.png',
    "/image/image3.png",
    "/image/image4.png",
    "/image/image5.png",
    "/image/image6.png",
    "/image/image7.png",
    "/image/image8.png",
    "/image/image9.png",
    "/image/image10.png",
    "/image/image11.png",
    "/image/image12.png",
    "/image/image13.png",
    "/image/image14.png",
    "/image/image15.png",
    "/image/image16.png",
    "/image/image17.png",
    "/image/image18.png",
    "/image/image19.png",
    '/image/imagea.png',
    '/image/imageb.png',
    '/image/imagec.png',
    '/image/imaged.png',
    '/image/imagee.png',
    '/image/imagef.png',
  ]

  return {
    _id: `p${n}`,
    title: `Sản phẩm #${n}`,
    slug: `san-pham-${n}`,
    price: 99000 + n * 10000,
    images: [Image[n-1]],
    stock: n % 7 === 0 ? 0 : ((n * 3) % 21) + 1,
    rating: (n % 5) + 1,
    brand: BRANDS[n % BRANDS.length],
    variants: [{ color: COLORS[n % COLORS.length], size: SIZES[n % SIZES.length] }],
    description: "Mô tả ngắn cho sản phẩm.",
    category: n % 2 ? "fashion" : "accessories",
    discountPercent: discounts[n] ?? 0,
  } satisfies Product;
});