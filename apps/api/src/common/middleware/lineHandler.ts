import * as line from '@line/bot-sdk';
import { Event } from '@line/bot-sdk/dist/webhook/api';
import { Request, Response } from 'express';

import { LINE_CHANNEL_ACCESS_TOKEN, LINE_CHANNEL_SECRET } from '../../env';

export const lineConfig = {
  channelAccessToken: LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: LINE_CHANNEL_SECRET,
};
export const lineClient = new line.Client(lineConfig);

export const handleLineWebHook = async (event: Event) => {
  if (event.type === 'memberJoined') {
    return lineClient.replyMessage(event.replyToken, {
      type: 'text',
      text: `🎉 Welcome to the group! 🎉\n✨ Add me to let Sommhai help you manage your event! 🗓️`,
    });
  } else if (event.type === 'join') {
    return lineClient.replyMessage(event.replyToken, {
      type: 'text',
      text: `Thank you for adding me to the group! 🎉\n✨ Add me to let Sommhai help you manage your event! 🗓️`,
    });
  } else {
    return Promise.resolve(null);
  }
};

export const lineHandler = (req: Request, res: Response) => {
  Promise.all(req.body.events.map(handleLineWebHook)).then((result) => res.json(result));
};
