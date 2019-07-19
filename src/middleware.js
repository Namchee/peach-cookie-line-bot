import crypto from 'crypto';

export function checkSignature(req, res) {
  try {
    const body = JSON.stringify(req.body);

    const signature = crypto.createHmac('SHA256', process.env.CHANNEL_SECRET)
      .update(body).digest('base64');

    if (signature !== req.headers['x-line-signature']) {
      return res.status(401)
        .send('Unauthorized');
    }
  } catch (err) {
    console.error(err);

    res.status(500).send('Internal server error');
  }
}
