import dotenv from 'dotenv';

const result = dotenv.config({
  path: String.prototype.concat(__dirname, '\\config.env'),
});

if (result.error) {
  console.error('Failed to locate environment variable');
  process.exit();
}

export const config = {
  access_token: process.env.CHANNEL_ACCESS_TOKEN,
  secret: process.env.CHANNEL_SECRET,
};
