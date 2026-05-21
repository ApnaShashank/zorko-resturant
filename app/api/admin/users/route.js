import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

const TOKEN = 'zorko19042026';
const auth = (req) => req.headers.get('x-admin-token') === TOKEN;

async function log(db, action, description, data = {}) {
  await db.collection('adminLogs').insertOne({ action, description, data, timestamp: new Date() });
}

// GET all users
export async function GET(req) {
  if (!auth(req)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  try {
    const client = await clientPromise;
    const db = client.db('zorko');
    const users = await db.collection('users').find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({
      success: true,
      users: users.map(u => ({ ...u, _id: u._id.toString() }))
    });
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

// DELETE user
export async function DELETE(req) {
  if (!auth(req)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  try {
    const { phone, name } = await req.json();
    const client = await clientPromise;
    const db = client.db('zorko');
    await db.collection('users').deleteOne({ phone });
    await log(db, 'delete_user', `Deleted user: ${name} (${phone})`, { phone, name });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

// PATCH — adjust coins
export async function PATCH(req) {
  if (!auth(req)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  try {
    const { phone, coins, name } = await req.json();
    const client = await clientPromise;
    const db = client.db('zorko');
    const result = await db.collection('users').findOneAndUpdate(
      { phone },
      { $set: { coins: parseInt(coins) } },
      { returnDocument: 'after' }
    );
    await log(db, 'adjust_coins', `Adjusted coins for ${name} (${phone}) to ${coins}`, { phone, name, coins });
    return NextResponse.json({ success: true, user: { ...result, _id: result._id.toString() } });
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
