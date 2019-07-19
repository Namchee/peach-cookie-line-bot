import express from 'express';
import { Client, middleware } from '@line/bot-sdk';

import { checkSignature } from './../middleware';
import { replyMessage } from './../eventhandler';

import { config as cfg } from './../../cfg/config';

const config = {
  channelAccessToken: cfg.access_token,
  channelSecret: cfg.secret,
};

const client = new Client(config);

const router = express.Router();

router.post('/webhook',
  middleware(config),
  (req, res, next) => {
    checkSignature(req, res, next);
  },
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
