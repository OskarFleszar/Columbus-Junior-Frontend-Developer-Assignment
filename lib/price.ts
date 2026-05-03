export function calculateDiscountedPrice(
  price: number,
  percentage: number,
): number {
  return Math.round(price * (1 - percentage / 100));
}
