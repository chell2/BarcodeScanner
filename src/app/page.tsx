'use client';

import { useState } from 'react';
import BarcodeScanner from '@/components/BarcodeScanner';
import ProductInfo from '@/components/ProductInfo';

const Home = () => {
  const [productInfo, setProductInfo] = useState<any | null>(null);

  const handleDetected = (code: string) => {
    console.log(`Barcode detected: ${code}`);
  };

  const handleError = (message: string) => {
    console.error('Error:', message);
  };

  const handleMatchFound = (product: any) => {
    setProductInfo(product); // 一致したプロダクト情報を設定
  };

  return (
    <div id="container">
      <div id="inner">
        <h1>
          <small>||||</small> Scan Barcode!! <small>||||</small>
        </h1>
        <BarcodeScanner
          onDetected={handleDetected}
          onError={handleError}
          onMatchFound={handleMatchFound}
        />
        {productInfo && <ProductInfo product={productInfo} />}
      </div>
    </div>
  );
};

export default Home;