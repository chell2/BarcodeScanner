import { NextResponse } from 'next/server';

export async function GET() {
  const sampleData = {
    id: 1,
    name: 'Sample Item',
    description: 'This is a sample description for the item.',
  };

  return NextResponse.json(sampleData);
}
