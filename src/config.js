import dotenv from 'dotenv';
dotenv.config();

export const config = {
  botToken: process.env.BOT_TOKEN || '',
  port: parseInt(process.env.PORT || '3000', 10),
  appUrl: process.env.APP_URL || process.env.SELF_PING_URL || ''
};
