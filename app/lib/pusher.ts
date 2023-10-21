import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_Id!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: 'eu',
  useTLS: true,
});

const pusherKey = process.env.NEXT_PUBLIC_PUSHER_KEY!;

export const pusherClient = new PusherClient(pusherKey, {
  cluster: 'eu',
});
