'use client';

import { useEffect, useState } from 'react';
import Quagga from 'quagga';

const Home = () => {
  const [barcodeResult, setBarcodeResult] = useState<string | null>(null);
  const [productInfo, setProductInfo] = useState<{
    name: string;
    brewery: string;
    origin: string;
    style: string;
    hops: string;
    ABV: string;
    IBU: string;
    description: string;
    image: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          target: document.querySelector('#interactive'),
          constraints: {
            width: { ideal: 720 },
            height: { ideal: 540 },
            facingMode: 'environment', // リアカメラを使用
          },
        },
        decoder: {
          readers: [
            'ean_reader', // EAN-13 :欧州13桁 =JANコード(GTIN-13)
            // 'code_128_reader', // 情報密度高、物流など
            // 'ean_8_reader', // EAN-8 :欧州8桁
            // 'code_39_reader', // 軍隊・自動車産業
            // 'code_39_vin_reader',
            // 'codabar_reader', // 図書館など
            // 'upc_reader', // UPC-A :米国12桁
            // 'upc_e_reader', // UPC-E :米国8桁
            // 'i2of5_reader',
            // '2of5_reader', // 流通・倉庫
            // 'code_93_reader', // 特殊な配送情報
          ],
        },
        locator: {
          patchSize: 'medium',
        },
      },
      (err: any) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onProcessed((result: any) => {
      if (result) {
        const drawingCtx = Quagga.canvas.ctx.overlay;
        const drawingCanvas = Quagga.canvas.dom.overlay;

        if (result.boxes) {
          drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
          result.boxes
            .filter((box: any) => box !== result.box)
            .forEach((box: any) => {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: 'blue',
                lineWidth: 2,
              });
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: '#EA5F23',
            lineWidth: 4,
          });
        }
      }
    });

    Quagga.onDetected(async (data: any) => {
      const code = data.codeResult.code;
      console.log('Barcode detected:', code);
      setBarcodeResult(code);

      try {
        const response = await fetch(`/api/products?barcode=${code}`);
        if (response.ok) {
          const product = await response.json();
          setProductInfo(product);
          setError(null);
        } else {
          const errorData = await response.json();
          setError(errorData.message);
          setProductInfo(null);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('An error occurred while fetching product data');
        setProductInfo(null);
      }
    });

    return () => {
      Quagga.stop();
    };
  }, []);

  return (
    <div id="container">
      <div id="inner">
        <h1>
          <small>|||||</small> Scan Barcode <small>|||||</small>
        </h1>
        <div id="interactive" className="viewport"></div>
        {barcodeResult && (
          <div id="result">
            {productInfo ? (
              <div id="info">
                <h3>{productInfo.name}</h3>
                <p>Brewery： {productInfo.brewery}</p>
                <p>Origin： {productInfo.origin}</p>
                <p>Style： {productInfo.style}</p>
                <p>Hops： {productInfo.hops}</p>
                <p>
                  ABV： {productInfo.ABV}% ／ IBU： {productInfo.IBU}
                </p>
                <p>
                  <small>
                    ===== Story ========
                    <br />
                    {productInfo.description.length > 120 ? (
                      <>
                        {isExpanded
                          ? productInfo.description
                              .split('\n')
                              .map((line, index) => (
                                <span key={index}>
                                  {line}
                                  <br />
                                </span>
                              ))
                          : productInfo.description.slice(0, 120)}
                        {!isExpanded && (
                          <span
                            id="readmore"
                            onClick={() => setIsExpanded(true)}
                          >
                            &nbsp;...続きをみる
                          </span>
                        )}
                      </>
                    ) : (
                      productInfo.description.split('\n').map((line, index) => (
                        <span key={index}>
                          {line}
                          <br />
                        </span>
                      ))
                    )}
                  </small>
                </p>
                <img
                  src={productInfo.image}
                  alt={productInfo.name}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            ) : (
              error && <p>{error}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
