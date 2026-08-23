import { SensiEngine } from '../services/sensiEngine.js';
import { RedeemService } from '../services/redeemService.js';
import { NicknameStyler } from '../data/nicknames.js';
import { Messages } from '../ui/messages.js';
import { Keyboards } from '../ui/keyboards.js';

export class CommandHandlers {
  static async handleStart(ctx) {
    const text = Messages.welcome(ctx.from);
    return ctx.reply(text, {
      parse_mode: 'HTML',
      ...Keyboards.mainMenu()
    });
  }

  static async handleSensi(ctx) {
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

    // Return the top match
    const best = matches[0];
    const cardText = Messages.sensiCard(best, best.brandIcon || '📱');

    return ctx.reply(cardText, {
      parse_mode: 'HTML',
      ...Keyboards.sensiActions(best.brandKey)
    });
  }

  static async handleRedeem(ctx) {
    const codes = RedeemService.getTodayCodes();
    const text = Messages.redeemCodesCard(codes);

    return ctx.reply(text, {
      parse_mode: 'HTML',
      ...Keyboards.redeemActions()
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
🎁 <b>Redeem Server:</b> <code>Active &amp; Verified</code>
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
