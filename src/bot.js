import { Telegraf } from 'telegraf';
import express from 'express';
import axios from 'axios';
import { config } from './config.js';
import { CommandHandlers } from './handlers/commands.js';
import { CallbackHandlers } from './handlers/callbacks.js';

process.on('unhandledRejection', (reason, promise) => {
  console.error('[Process Safety] Unhandled Rejection:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('[Process Safety] Uncaught Exception:', err);
});

async function bootstrap() {
  console.log('⚡ Starting VENOM FreeFire Bot Engine...');

  const bot = new Telegraf(config.botToken || 'DUMMY_TOKEN');

  // Register Slash Commands
  bot.start(CommandHandlers.handleStart);
  bot.command('sensi', CommandHandlers.handleSensi);
  bot.command(['player', 'id', 'uid'], CommandHandlers.handlePlayer);
  bot.command('redeem', CommandHandlers.handleRedeem);
  bot.command('nick', CommandHandlers.handleNick);
  bot.command('room', CommandHandlers.handleRoom);
  bot.command('ping', CommandHandlers.handlePing);
  bot.command('help', CommandHandlers.handleHelp);

  // Register Callbacks
  await CallbackHandlers.register(bot);

  bot.catch((err, ctx) => {
    console.error(`[Telegraf Error] Error during update ${ctx.updateType}:`, err.message);
  });

  // Express Web Server for 24/7 Keep-Alive & UptimeRobot
  const app = express();
  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({
      status: 'online',
      service: 'VENOM-FREEFIRE-BOT',
      version: '1.0.0',
      author: 'MR VENOM (@MykelGoal)',
      features: ['0-200 Calibrated Sensitivity', 'Daily Redeem Codes', 'Player UID Stalker', 'Nickname Styler', 'Custom Room Announcer']
    });
  });

  app.get(['/ping', '/health', '/keep-alive'], (req, res) => {
    res.status(200).json({
      status: 'ok',
      service: 'VENOM-FREEFIRE-BOT',
      pong: true,
      timestamp: Date.now()
    });
  });

  const server = app.listen(config.port, '0.0.0.0', () => {
    console.log(`🌐 FreeFire Keep-Alive server listening on http://0.0.0.0:${config.port}`);
  });

  // Auto Self-Ping Worker
  if (config.appUrl) {
    console.log(`🔄 Auto self-ping active for: ${config.appUrl}/ping (every 10m)`);
    setInterval(async () => {
      try {
        await axios.get(`${config.appUrl.replace(/\/$/, '')}/ping`, { timeout: 8000 });
        console.log(`[Keep-Alive] Self-ping successful at ${new Date().toLocaleTimeString()}`);
      } catch (err) {
        console.warn(`[Keep-Alive] Self-ping warning: ${err.message}`);
      }
    }, 10 * 60 * 1000);
  }

  // Start Telegram Bot
  if (config.botToken && config.botToken !== 'DUMMY_TOKEN') {
    bot.launch()
      .then(() => console.log('🤖 FreeFire Telegram Bot connected and listening!'))
      .catch((err) => console.error('❌ Failed to launch bot:', err.message));
  } else {
    console.log('ℹ️ Bot token missing or dummy. Server running in standby mode.');
  }

  const shutdown = () => {
    console.log('\n🛑 Gracefully shutting down...');
    server.close();
    process.exit(0);
  };

  process.once('SIGINT', shutdown);
  process.once('SIGTERM', shutdown);
}

bootstrap().catch(console.error);
