import webpush from 'web-push';
import clientPromise from './mongodb';

webpush.setVapidDetails(
  'mailto:zorkojiyanpur1@gmail.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export async function sendPushToAll({ title, body }) {
  try {
    const client = await clientPromise;
    const db = client.db('zorko');
    const subscriptions = await db.collection('pushSubscriptions').find({}).toArray();

    const payload = JSON.stringify({
      title,
      body,
      icon: 'https://ik.imagekit.io/DEMOPROJECT/b9e93af6-869f-444a-9940-7d87a43b6b45.png',
      badge: 'https://ik.imagekit.io/DEMOPROJECT/b9e93af6-869f-444a-9940-7d87a43b6b45.png',
    });

    let sent = 0;
    for (const sub of subscriptions) {
      try {
        await webpush.sendNotification(sub, payload);
        sent++;
      } catch (err) {
        // Remove invalid/expired subscriptions
        if (err.statusCode === 410 || err.statusCode === 404) {
          await db.collection('pushSubscriptions').deleteOne({ endpoint: sub.endpoint });
        }
      }
    }
    return sent;
  } catch (err) {
    console.error('Push send error:', err);
    return 0;
  }
}
