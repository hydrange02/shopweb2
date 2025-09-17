import Image from "next/image";
import Link from "next/link";
import { formatVND } from "@/app/lib/format";

export type ProductCardProps = {
  title: string;
  price: number;
  href: string;
  image?: string;
  stock?: number;
  brand?: string;
  rating?: number; 
};

export default function ProductCard({ title, price, href, rating = 0, brand='NO Brand', image = "/placeholder.png", stock = 10 }: ProductCardProps) {
  const outOfStock = (stock ?? 0) <= 0;

  return (
    <div className="border rounded-xl overflow-hidden bg-white hover:shadow-sm transition">
      <Link href={href} className="block">
        <div className="relative aspect-square">
          <Image src={image} alt={title} fill className="object-cover" />
          {outOfStock && (
            <span className="absolute left-2 top-2 text-xs bg-red-500 text-white px-2 py-1 rounded-md">Hết hàng</span>
          )}
        </div>
        <p className="text-xs text-gray-500">{brand}</p>
        <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs text-gray-500">({rating})</span>
          </div>
        <div className="p-3">
          <h3 className="text-sm font-medium line-clamp-2 min-h-[2.5rem]">{title}</h3>
          <p className="mt-1 font-semibold">{formatVND(price)}</p>
          <button
            disabled={outOfStock}
            className="mt-3 w-full h-9 text-sm rounded-md border hover:bg-gray-50 disabled:opacity-40"
            aria-disabled={outOfStock}
          >
            Thêm vào giỏ
          </button>
        </div>
      </Link>
    </div>
  );
}