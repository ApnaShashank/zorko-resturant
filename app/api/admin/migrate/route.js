import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

const TOKEN = 'zorko19042026';

function generateUID() {
  return Math.floor(1000000 + Math.random() * 9000000).toString();
}

export async function POST(req) {
  if (req.headers.get('x-admin-token') !== TOKEN) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const client = await clientPromise;
    const db = client.db('zorko');
    const usersCol = db.collection('users');

    const usersWithoutUID = await usersCol.find({ uid: { $exists: false } }).toArray();
    let updated = 0;

    for (const user of usersWithoutUID) {
      let uid;
      let isUnique = false;
      while (!isUnique) {
        uid = generateUID();
        const existing = await usersCol.findOne({ uid });
        if (!existing) isUnique = true;
      }
      await usersCol.updateOne({ _id: user._id }, { $set: { uid } });
      updated++;
    }

    // Also ensure loginHistory and gameStats fields exist
    await usersCol.updateMany(
      { loginHistory: { $exists: false } },
      { $set: { loginHistory: [], gameStats: {} } }
    );

    return NextResponse.json({ success: true, updated });
  } catch (error) {
    console.error('Migrate error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
