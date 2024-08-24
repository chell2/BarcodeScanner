'use client';

import { useEffect, useState } from 'react';
import Quagga from 'quagga';

interface BarcodeScannerProps {
  onDetected: (code: string) => void;
  onError: (message: string) => void;
  onMatchFound: (productInfo: any) => void; // 一致したプロダクト情報を渡す
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
  onDetected,
  onError,
  onMatchFound,
}) => {
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          target: document.querySelector('#interactive'), // スキャン結果を表示する要素
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
        // locate: true,
        // multiple: true,
        locator: {
          halfSample: false,
          patchSize: 'medium',
        },
      },
      (err: any) => {
        if (err) {
          onError(err.message);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected(async (data: any) => {
      const code = data.codeResult.code;
      if (scannedBarcode === code) return; // 同じコードが再度スキャンされた場合は無視

      setScannedBarcode(code);
      onDetected(code);

      try {
        const response = await fetch(`/api/products?barcode=${code}`);
        if (response.ok) {
          const product = await response.json();
          onMatchFound(product); // 一致したプロダクト情報を渡す
          Quagga.stop(); // スキャンを停止
        } else {
          const errorData = await response.json();
          onError(errorData.message);
        }
      } catch (err) {
        onError('An error occurred while fetching product data');
      }
    });

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

    return () => {
      Quagga.stop();
    };
  }, [onDetected, onError, onMatchFound, scannedBarcode]);

  return <div id="interactive" className="viewport"></div>;
};

export default BarcodeScanner;
