import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

const TOKEN = 'zorko19042026';

export async function POST(req) {
  if (req.headers.get('x-admin-token') !== TOKEN) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { name, uid } = await req.json();
    if (!name || !uid) {
      return NextResponse.json({ success: false, error: 'Name and UID are required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('zorko');

    const user = await db.collection('users').findOne({ uid: uid.toString().trim() });
    if (!user) {
      return NextResponse.json({ success: false, error: 'No user found with this UID. Please check the ID.' }, { status: 404 });
    }

    if (user.name.toLowerCase().trim() !== name.toLowerCase().trim()) {
      return NextResponse.json({ success: false, error: 'Name does not match this UID. Please verify.' }, { status: 400 });
    }

    if (!user.coins || user.coins < 100) {
      return NextResponse.json({
        success: false,
        error: `User only has ${user.coins || 0} coins. Minimum 100 coins required for any discount.`
      }, { status: 400 });
    }

    const discountPct = (user.coins / 100).toFixed(1);
    const prevCoins = user.coins;

    await db.collection('users').updateOne(
      { uid: uid.toString().trim() },
      {
        $set: { coins: 0 },
        $push: {
          history: {
            game: '🎫 Discount Redeemed at Restaurant',
            amount: -prevCoins,
            date: new Date().toLocaleDateString('en-IN', {
              day: 'numeric', month: 'short', year: 'numeric',
              hour: '2-digit', minute: '2-digit'
            })
          }
        }
      }
    );

    await db.collection('adminLogs').insertOne({
      action: 'redeem_discount',
      description: `Redeemed ${discountPct}% discount for ${user.name} (UID: ${uid}). ${prevCoins} coins cleared.`,
      data: { uid, name: user.name, phone: user.phone, prevCoins, discountPct },
      timestamp: new Date()
    });

    return NextResponse.json({
      success: true,
      user: { name: user.name, phone: user.phone, uid, prevCoins, discountPct }
    });
  } catch (error) {
    console.error('Redeem error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
