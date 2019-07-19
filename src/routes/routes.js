import express from 'express';
import { Client, middleware } from '@line/bot-sdk';

import { checkSignature } from './../middleware';
import { replyMessage } from './../eventhandler';

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new Client(config);

const router = express.Router();

router.post('/webhook',
  middleware(config),
  (req, res) => {
    Promise.all(req.body.events.map(event => replyMessage(client, event)))
    .then(result => res.status(200).send(result))
    .catch(err => {
      console.error(err);

      res.status(500).send(err);
    });
  },
);

export { router };
