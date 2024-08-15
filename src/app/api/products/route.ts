import { NextResponse } from 'next/server';
import { getProductByBarcode } from '@/lib/db'; // データベースから商品を取得する関数

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const barcode = searchParams.get('barcode');

  if (!barcode) {
    return NextResponse.json(
      { message: 'Barcode is required' },
      { status: 400 }
    );
  }

  const product = await getProductByBarcode(barcode);
  if (product) {
    return NextResponse.json(product);
  } else {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
}
