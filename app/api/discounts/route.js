import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('zorko');
    const discounts = await db.collection('discounts')
      .find({ active: true })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      discounts: discounts.map(d => ({ ...d, _id: d._id.toString() }))
    }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return NextResponse.json({ success: false, discounts: [] }, { status: 500 });
  }
}
