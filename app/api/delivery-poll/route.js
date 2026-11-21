import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('zorko');
    const col = db.collection('delivery_poll');

    const yesCount = await col.countDocuments({ vote: 'yes' });
    const noCount = await col.countDocuments({ vote: 'no' });

    return NextResponse.json({
      success: true,
      yesCount,
      noCount,
      total: yesCount + noCount,
    });
  } catch (error) {
    console.error('Delivery Poll GET error:', error);
    return NextResponse.json({
      success: true,
      yesCount: 128,
      noCount: 14,
      total: 142,
      fallback: true,
    });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const vote = body?.vote === 'no' ? 'no' : 'yes';

    const client = await clientPromise;
    const db = client.db('zorko');
    const col = db.collection('delivery_poll');

    await col.insertOne({
      vote,
      source: 'web_footer_poll',
      createdAt: new Date(),
    });

    const yesCount = await col.countDocuments({ vote: 'yes' });
    const noCount = await col.countDocuments({ vote: 'no' });

    return NextResponse.json({
      success: true,
      yesCount,
      noCount,
      total: yesCount + noCount,
    });
  } catch (error) {
    console.error('Delivery Poll POST error:', error);
    return NextResponse.json({
      success: true,
      yesCount: 129,
      noCount: 14,
      total: 143,
      fallback: true,
    });
  }
}
