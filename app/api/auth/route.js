import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

function generateUID() {
  return Math.floor(1000000 + Math.random() * 9000000).toString();
}

export async function POST(req) {
  try {
    const { action, name, phone, password } = await req.json();

    if (!phone || !password) {
      return NextResponse.json({ success: false, error: 'Phone and password are required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('zorko');
    const usersCollection = db.collection('users');

    const cleanPhone = phone.trim();

    if (action === 'register') {
      if (!name) {
        return NextResponse.json({ success: false, error: 'Name is required' }, { status: 400 });
      }

      const existingUser = await usersCollection.findOne({ phone: cleanPhone });
      if (existingUser) {
        return NextResponse.json({ success: false, error: 'Phone number already registered' }, { status: 400 });
      }

      // Generate unique 7-digit UID
      let uid;
      let isUnique = false;
      while (!isUnique) {
        uid = generateUID();
        const existingUID = await usersCollection.findOne({ uid });
        if (!existingUID) isUnique = true;
      }

      const newUser = {
        name: name.trim(),
        phone: cleanPhone,
        password: password,
        uid,
        coins: 0,
        history: [],
        loginHistory: [{ date: new Date().toISOString() }],
        gameStats: {},
        createdAt: new Date()
      };

      await usersCollection.insertOne(newUser);

      return NextResponse.json({
        success: true,
        user: {
          name: newUser.name,
          phone: newUser.phone,
          uid: newUser.uid,
          coins: newUser.coins,
          history: newUser.history
        }
      });
    } else if (action === 'login') {
      const user = await usersCollection.findOne({ phone: cleanPhone });

      if (!user) {
        return NextResponse.json({ success: false, error: 'Phone number not registered. Please register first.' }, { status: 404 });
      }

      if (user.password !== password) {
        return NextResponse.json({ success: false, error: 'Incorrect password. Please try again.' }, { status: 401 });
      }

      // Track login history
      await usersCollection.updateOne(
        { phone: cleanPhone },
        { $push: { loginHistory: { date: new Date().toISOString() } } }
      );

      return NextResponse.json({
        success: true,
        user: {
          name: user.name,
          phone: user.phone,
          uid: user.uid || null,
          coins: user.coins || 0,
          history: user.history || []
        }
      });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Auth API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
