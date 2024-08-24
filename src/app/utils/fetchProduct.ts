import { useState, useCallback } from 'react';

interface ProductInfo {
  name: string;
  brewery: string;
  origin: string;
  style: string;
  hops: string;
  ABV: string;
  IBU: string;
  description: string;
  image: string;
}

export const useProduct = () => {
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async (barcode: string) => {
    try {
      const response = await fetch(`/api/products?barcode=${barcode}`);
      const data = await response.json();

      if (data && data.name) {
        setProductInfo(data);
        setError(null);
      } else {
        setProductInfo(null);
        setError('Product not found');
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setProductInfo(null);
      setError('An error occurred while fetching product data');
    }
  }, []);

  return { productInfo, error, fetchProduct };
};
