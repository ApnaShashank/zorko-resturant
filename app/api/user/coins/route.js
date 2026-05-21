import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { phone, game } = await req.json();

    if (!phone || !game) {
      return NextResponse.json({ success: false, error: 'Phone and game name are required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('zorko');
    const usersCollection = db.collection('users');

    const cleanPhone = phone.trim();

    const dateStr = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const historyEntry = { game, amount: 1, date: dateStr };

    // gameStats key (convert to safe key)
    const gameKey = game.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '').toLowerCase();

    const result = await usersCollection.findOneAndUpdate(
      { phone: cleanPhone },
      {
        $inc: {
          coins: 1,
          [`gameStats.${gameKey}.plays`]: 1,
          [`gameStats.${gameKey}.wins`]: 1
        },
        $push: { history: historyEntry }
      },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        name: result.name,
        phone: result.phone,
        uid: result.uid || null,
        coins: result.coins,
        history: result.history
      }
    });
  } catch (error) {
    console.error('Update Coins API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
