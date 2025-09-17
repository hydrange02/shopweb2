export function formatVND(value: number) {
  return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}