'use client';

import { useEffect, useState } from 'react';
import { getFromLocalStorage } from '@/utils/localStorageUtils';

const ProductList: React.FC = () => {
  const [productList, setProductList] = useState<
    { name: string; brewery: string }[]
  >([]);

  useEffect(() => {
    const storedData = getFromLocalStorage();
    setProductList(storedData);
  }, []);

  return (
    <div className="my-4">
      ---------------------------
      <div className="card">
        <h2 className="text-lg font-bold">過去の読込みデータ</h2>
        <ul>
          {productList.map((product, index) => (
            <li key={index} className="border p-2 my-2">
              <b>🍺 {product.name}</b>
              <p>Brewery: {product.brewery}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
