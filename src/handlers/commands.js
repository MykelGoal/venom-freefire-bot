import { SensiEngine } from '../services/sensiEngine.js';
import { RedeemService } from '../services/redeemService.js';
import { PlayerService } from '../services/playerService.js';
import { NicknameStyler } from '../data/nicknames.js';
import { Messages } from '../ui/messages.js';
import { Keyboards } from '../ui/keyboards.js';
import { db } from '../storage/database.js';

export class CommandHandlers {
  static async handleStart(ctx) {
    const userId = ctx.from.id;

    if (!db.isUserVerified(userId)) {
      return ctx.reply(Messages.verifySubscriptionRequired(), {
        parse_mode: 'HTML',
        ...Keyboards.subscriptionGate()
      });
    }

    const text = Messages.welcome(ctx.from);
    return ctx.reply(text, {
      parse_mode: 'HTML',
      ...Keyboards.mainMenu()
    });
  }

  static async handleSensi(ctx) {
    const userId = ctx.from.id;
    if (!db.isUserVerified(userId)) {
      return ctx.reply(Messages.verifySubscriptionRequired(), {
        parse_mode: 'HTML',
        ...Keyboards.subscriptionGate()
      });
    }

    const text = ctx.message.text || '';
    const parts = text.split(' ').slice(1);
    const query = parts.join(' ').trim();

    if (!query) {
      return ctx.reply('🎯 <b>Select your phone brand to get exact 0–200 sensitivity:</b>', {
        parse_mode: 'HTML',
        ...Keyboards.brandList()
      });
    }

    const matches = SensiEngine.search(query);

    if (matches.length === 0) {
      return ctx.reply(`⚠️ No exact device found for "<b>${Messages.escapeHtml(query)}</b>".\n\nTry browsing your brand from the list:`, {
        parse_mode: 'HTML',
        ...Keyboards.brandList()
      });
    }

    const best = matches[0];
    const cardText = Messages.sensiCard(best, best.brandIcon || '📱');

    return ctx.reply(cardText, {
      parse_mode: 'HTML',
      ...Keyboards.sensiActions(best.brandKey)
    });
  }

  static async handlePlayer(ctx) {
    const userId = ctx.from.id;
    if (!db.isUserVerified(userId)) {
      return ctx.reply(Messages.verifySubscriptionRequired(), {
        parse_mode: 'HTML',
        ...Keyboards.subscriptionGate()
      });
    }

    const text = ctx.message.text || '';
    const parts = text.split(' ').slice(1);
    const uid = parts[0] ? parts[0].trim() : '';
    const region = parts[1] ? parts[1].trim() : 'SG';

    if (!uid) {
      return ctx.reply(`
🔍 <b>FREE FIRE PLAYER UID LOOKUP</b>
━━━━━━━━━━━━━━━━━━━━━━━━━━
Send your Free Fire UID like this:
<code>/player &lt;UID&gt; [REGION]</code>

<b>Example:</b>
• <code>/player 198273645</code>
• <code>/player 198273645 IND</code>
• <code>/player 198273645 BR</code>
`.trim(), {
        parse_mode: 'HTML',
        ...Keyboards.backToMenu()
      });
    }

    await ctx.replyWithChatAction('typing');
    try {
      const profile = await PlayerService.getPlayerProfile(uid, region);
      const card = Messages.playerProfileCard(profile);
      return ctx.reply(card, {
        parse_mode: 'HTML',
        ...Keyboards.backToMenu()
      });
    } catch (err) {
      return ctx.reply(`❌ <b>Lookup Failed:</b> ${err.message}`, {
        parse_mode: 'HTML'
      });
    }
  }

  static async handleRedeem(ctx) {
    const userId = ctx.from.id;
    if (!db.isUserVerified(userId)) {
      return ctx.reply(Messages.verifySubscriptionRequired(), {
        parse_mode: 'HTML',
        ...Keyboards.subscriptionGate()
      });
    }

    await ctx.replyWithChatAction('typing');
    const codes = await RedeemService.fetchLiveCodes('all');
    const text = Messages.redeemCodesCard(codes, 'All Servers');

    return ctx.reply(text, {
      parse_mode: 'HTML',
      ...Keyboards.redeemActions('all')
    });
  }

  static async handleNick(ctx) {
    const text = ctx.message.text || '';
    const parts = text.split(' ').slice(1);
    const name = parts.join(' ').trim() || ctx.from.first_name || 'VENOM';

    const styledList = NicknameStyler.generateAll(name);
    const cardText = Messages.nicknameCard(name, styledList);

    return ctx.reply(cardText, {
      parse_mode: 'HTML',
      ...Keyboards.backToMenu()
    });
  }

  static async handleRoom(ctx) {
    const text = ctx.message.text || '';
    const parts = text.split(' ').slice(1);
    const roomId = parts[0] || '84920194';
    const pass = parts[1] || '1234';
    const map = parts[2] || 'Bermuda';

    const cardText = Messages.customRoomCard(roomId, pass, map);
    return ctx.reply(cardText, {
      parse_mode: 'HTML',
      ...Keyboards.backToMenu()
    });
  }

  static async handlePing(ctx) {
    const start = Date.now();
    const sentMsg = await ctx.reply('⚡ <i>Pinging FreeFire server...</i>', { parse_mode: 'HTML' });
    const latency = Date.now() - start;

    const text = `
⚡ <b>PONG! VENOM FreeFire Engine Online</b>
━━━━━━━━━━━━━━━━━━━━━━━━━━
📶 <b>Ping Latency:</b> <code>${latency}ms</code>
🎯 <b>Calibrated Devices:</b> <code>100+ Models (0–200 Sensi)</code>
🎁 <b>Redeem Server:</b> <code>Dynamic Daily Rotation</code>
🟢 <b>Uptime:</b> <code>24/7 Keep-Alive Online</code>
━━━━━━━━━━━━━━━━━━━━━━━━━━
`.trim();

    return ctx.telegram.editMessageText(ctx.chat.id, sentMsg.message_id, undefined, text, {
      parse_mode: 'HTML',
      ...Keyboards.backToMenu()
    });
  }

  static async handleHelp(ctx) {
    return ctx.reply(Messages.helpGuide(), {
      parse_mode: 'HTML',
      ...Keyboards.backToMenu()
    });
  }
}
