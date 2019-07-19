import crypto from 'crypto';

export function checkSignature(req, res, next) {
  try {
    const body = JSON.stringify(req.body);

    const signature = crypto.createHmac('SHA256', process.env.CHANNEL_SECRET)
      .update(body).digest('base64');

    if (signature !== req.headers['x-line-signature']) {
      return res.status(401)
        .send('Unauthorized');
    }

    next();
  } catch (err) {
    console.error(err);

    return res.status(500).send('Internal server error');
  }
}
