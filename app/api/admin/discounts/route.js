import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { sendPushToAll } from '@/lib/webpush';

const TOKEN = 'zorko19042026';
const auth = (req) => req.headers.get('x-admin-token') === TOKEN;

async function log(db, action, description, data = {}) {
  await db.collection('adminLogs').insertOne({ action, description, data, timestamp: new Date() });
}

// GET all discounts (admin — includes inactive)
export async function GET(req) {
  if (!auth(req)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  try {
    const client = await clientPromise;
    const db = client.db('zorko');
    const discounts = await db.collection('discounts').find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ success: true, discounts: discounts.map(d => ({ ...d, _id: d._id.toString() })) });
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

// POST — create new discount + send push notification
export async function POST(req) {
  if (!auth(req)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  try {
    const { title, description, badge, color, active } = await req.json();
    if (!title) return NextResponse.json({ success: false, error: 'Title is required' }, { status: 400 });

    const client = await clientPromise;
    const db = client.db('zorko');

    const discount = {
      title: title.trim(),
      description: description?.trim() || '',
      badge: badge || '🎉',
      color: color || '#FF8119',
      active: active !== false,
      createdAt: new Date()
    };

    const result = await db.collection('discounts').insertOne(discount);
    await log(db, 'create_discount', `Created new discount: "${title}"`, { title });

    // Send push notification to all subscribers
    try {
      const sent = await sendPushToAll({
        title: `🎉 New Offer at Zorko Jiyanpur!`,
        body: `${badge || '🎉'} ${title}: ${description || 'Check out our latest offer!'}`
      });
      console.log(`Push sent to ${sent} subscribers`);
    } catch (pushErr) {
      console.error('Push notification failed:', pushErr);
    }

    return NextResponse.json({ success: true, discount: { ...discount, _id: result.insertedId.toString() } });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

// PATCH — edit discount
export async function PATCH(req) {
  if (!auth(req)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  try {
    const { id, title, description, badge, color, active } = await req.json();
    const client = await clientPromise;
    const db = client.db('zorko');
    await db.collection('discounts').updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, description, badge, color, active, updatedAt: new Date() } }
    );
    await log(db, 'edit_discount', `Edited discount: "${title}"`, { id, title });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

// DELETE discount
export async function DELETE(req) {
  if (!auth(req)) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  try {
    const { id, title } = await req.json();
    const client = await clientPromise;
    const db = client.db('zorko');
    await db.collection('discounts').deleteOne({ _id: new ObjectId(id) });
    await log(db, 'delete_discount', `Deleted discount: "${title}"`, { id, title });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
