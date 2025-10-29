export type MinProduct = {
    slug: string;
    title: string;
    price: number;
    image: string;
    stock: number;
    rating:number;
    brand: string;
};

export const MIN_PRODUCTS: MinProduct[] = [
    { slug: "sp-1", title: "Áo thun cổ tròn", price: 129000, image: "/placeholder.svg", stock: 12,brand: "BT 2000",rating:0 },
    { slug: "sp-2", title: "Quần jeans slim", price: 459000, image: "/placeholder.svg", stock: 9 ,brand:"bT 500",rating:0},
    { slug: "sp-3", title: "Giày sneaker basic", price: 799000, image: "/placeholder.svg", stock: 5,brand:"unknown",rating:0 },
    { slug: "sp-4", title: "Túi tote canvas", price: 99000, image: "/placeholder.svg", stock: 20,brand:"unknown" ,rating:0},
    { slug: "sp-5", title: "Mũ lưỡi trai", price: 69000, image: "/placeholder.svg", stock: 3 ,brand:"unknown",rating:0},
    { slug: "sp-6", title: "Áo sơ mi kẻ", price: 259000, image: "/placeholder.svg", stock: 8 ,brand:"unknown",rating:0},
    { slug: "sp-7", title: "Váy midi", price: 349000, image: "/placeholder.svg", stock: 8,brand:"unknown",rating:0 },
    { slug: "sp-8", title: "Áo khoác gió", price: 559000, image: "/placeholder.svg", stock: 15 ,brand:"unknown",rating:0},
];
// có thể thêm nhiều sản phẩm hơn nếu muốn