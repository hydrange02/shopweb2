import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/app/lib/catalog";
import { formatVND } from "@/app/lib/format";
import AddToCartButton from "@/features/cart/AddToCartButton";

// Next 15: params là Promise
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return { title: product ? `${product.title} — Shoply` : "Sản phẩm — Shoply" };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return notFound();

  const image = product.images?.[0] ?? "/placeholder.png";
  
  return (
    <main className="py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Image
            src={image}
            alt={product.title}
            width={640}
            height={640}
            className="w-full h-auto rounded-xl border object-cover"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold">{product.title}</h2>

          <p className="mt-2 text-gray-600">Mã: {product.slug}</p>
          {product.discountPercent && product.discountPercent > 0 ? (
            <div className="mt-4">
              <p className="text-gray-400 line-through">
                {formatVND(product.price)}
              </p>
              <p className="text-2xl font-bold text-red-600">
                {formatVND(
                  Math.round(
                    product.price * (1 - product.discountPercent / 100)
                  )
                )}
              </p>
            </div>
          ) : (
            <p className="mt-4 text-2xl font-bold">
              {formatVND(product.price)}
            </p>
          )}

          {(product.stock ?? 0) <= 0 ? (
            <p className="mt-2 text-red-600">Hết hàng</p>
          ) : (
            <p className="mt-2 text-green-600">Còn {product.stock} sản phẩm</p>
          )}

          <div className="mt-6 flex gap-3 items-center flex-wrap">
            <AddToCartButton
              product={product}
              disabled={product.stock <= 0}
              fullWidth={false}
            />
            <button
              type="button"
              className="h-10 px-4 rounded-md border bg-black text-white"
            >
              Mua ngay
            </button>
            <Link
              className="h-10 px-4 rounded-md border flex items-center"
              href="/shop"
            >
              ← Quay lại Shop
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
