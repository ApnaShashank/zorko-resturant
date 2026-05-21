import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

const TOKEN = 'zorko19042026';

export async function GET(req) {
  if (req.headers.get('x-admin-token') !== TOKEN) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const client = await clientPromise;
    const db = client.db('zorko');
    const logs = await db.collection('adminLogs')
      .find({})
      .sort({ timestamp: -1 })
      .limit(200)
      .toArray();

    return NextResponse.json({
      success: true,
      logs: logs.map(l => ({ ...l, _id: l._id.toString() }))
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
