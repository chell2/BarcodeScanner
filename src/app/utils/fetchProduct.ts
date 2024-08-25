export async function fetchProductInfo(code: string) {
  const response = await fetch(`/api/products?barcode=${code}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product info');
  }
  return await response.json();
}
