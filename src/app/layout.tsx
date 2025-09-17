import "./globals.css";
import type { Metadata } from "next";
import SiteHeader from "@//app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";

export const metadata: Metadata = {
  title: "Shoply",
  description: "Catalog, giỏ hàng, đơn hàng, admin CRUD",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-gray-900">
        <SiteHeader />
        <div className="container mx-auto max-w-6xl px-4 py-6">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}