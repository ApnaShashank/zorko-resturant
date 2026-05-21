import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const subscription = await req.json();
    if (!subscription?.endpoint) {
      return NextResponse.json({ success: false, error: 'Invalid subscription' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('zorko');

    // Upsert — avoid duplicates
    await db.collection('pushSubscriptions').updateOne(
      { endpoint: subscription.endpoint },
      { $set: { ...subscription, updatedAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
