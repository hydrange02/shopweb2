import ProductCard from "@/app/components/ProductCard";
import { MIN_PRODUCTS } from "@/mock/min-products";

export default function ShopPage() {
  const items = MIN_PRODUCTS; // sau này sẽ fetch từ /api/products

  if (items.length === 0) {
    return (
      <main className="py-8">
        <h1 className="text-2xl font-semibold">Shop</h1>
        <p className="text-gray-600 mt-2">Chưa có sản phẩm.</p>
      </main>
    );
  }

  return (
    <main className="py-8">
      <h1 className="text-2xl font-semibold">Shop</h1>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((p) => (
          <ProductCard
            key={p.slug}
            title={p.title}
            price={p.price}
            image={p.image}
            stock={p.stock}
            href={`/shop/${p.slug}`} // route động sẽ làm ở Bài 03
          />
        ))}
      </div>
    </main>
  );
}