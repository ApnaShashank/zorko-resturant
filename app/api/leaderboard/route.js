import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('zorko');
    const usersCollection = db.collection('users');

    const count = await usersCollection.countDocuments();
    if (count === 0) {
      const defaultSeed = [
        { name: 'Shashank G.', phone: '9999999991', password: 'password123', coins: 42, history: [], createdAt: new Date() },
        { name: 'Nandani', phone: '9999999992', password: 'password123', coins: 35, history: [], createdAt: new Date() },
        { name: 'Aryan S.', phone: '9999999993', password: 'password123', coins: 28, history: [], createdAt: new Date() },
        { name: 'Pravesh S.', phone: '9999999994', password: 'password123', coins: 21, history: [], createdAt: new Date() },
        { name: 'Bandana S.', phone: '9999999995', password: 'password123', coins: 15, history: [], createdAt: new Date() },
      ];
      await usersCollection.insertMany(defaultSeed);
    }

    const topUsers = await usersCollection
      .find({})
      .project({ name: 1, coins: 1, _id: 0 })
      .sort({ coins: -1 })
      .limit(6)
      .toArray();

    return NextResponse.json({ success: true, leaderboard: topUsers }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  } catch (error) {
    console.error('Leaderboard API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
