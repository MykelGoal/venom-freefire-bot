import { SensiEngine } from '../services/sensiEngine.js';
import { RedeemService } from '../services/redeemService.js';
import { NicknameStyler } from '../data/nicknames.js';
import { Messages } from '../ui/messages.js';
import { Keyboards } from '../ui/keyboards.js';
import { db } from '../storage/database.js';

async function editMessageTextSafe(ctx, text, extra = {}) {
  try {
    return await ctx.editMessageText(text, extra);
  } catch (err) {
    if (err.message && err.message.includes('message is not modified')) {
      return;
    }
    throw err;
  }
}

export class CallbackHandlers {
  static async register(bot) {
    // YouTube Subscription Gate Callback
    bot.action('btn_verify_sub', async (ctx) => {
      const userId = ctx.from.id;
      db.verifyUser(userId);
      await ctx.answerCbQuery('🎉 Access Unlocked! Welcome to VENOM.');

      const text = `${Messages.verifiedSuccess()}\n\n${Messages.welcome(ctx.from)}`;
      await editMessageTextSafe(ctx, text, {
        parse_mode: 'HTML',
        ...Keyboards.mainMenu()
      });
    });

    // Explore VENOM Series
    bot.action('btn_venom_series', async (ctx) => {
      await ctx.answerCbQuery();
      await editMessageTextSafe(ctx, Messages.exploreVenomSeries(), {
        parse_mode: 'HTML',
        disable_web_page_preview: true,
        ...Keyboards.exploreSeries()
      });
    });

    // Main Menu
    bot.action('btn_main_menu', async (ctx) => {
      await ctx.answerCbQuery();
      const text = Messages.welcome(ctx.from);
      await editMessageTextSafe(ctx, text, {
        parse_mode: 'HTML',
        ...Keyboards.mainMenu()
      });
    });

    // Sensi Menu / Brand List
    bot.action('btn_menu_sensi', async (ctx) => {
      await ctx.answerCbQuery('🎯 Select your phone brand');
      const text = '🎯 <b>Select your phone brand to get exact 0–200 sensitivity:</b>';
      await editMessageTextSafe(ctx, text, {
        parse_mode: 'HTML',
        ...Keyboards.brandList()
      });
    });

    // Player UID Menu
    bot.action('btn_menu_player', async (ctx) => {
      await ctx.answerCbQuery();
      const text = `
🔍 <b>FREE FIRE PLAYER UID LOOKUP</b>
━━━━━━━━━━━━━━━━━━━━━━━━━━
Send your Free Fire UID to get full player profile stats:
<code>/player &lt;UID&gt; [REGION]</code>

<b>Examples:</b>
• <code>/player 198273645</code>
• <code>/player 198273645 IND</code>
• <code>/player 198273645 BR</code>
`.trim();

      await editMessageTextSafe(ctx, text, {
        parse_mode: 'HTML',
        ...Keyboards.backToMenu()
      });
    });

    // Brand Selected ➔ List Models
    bot.action(/^btn_brand_(.+)$/, async (ctx) => {
      const brandKey = ctx.match[1];
      await ctx.answerCbQuery('📱 Loading models...');
      const text = `📱 <b>Select your exact model:</b>`;
      await editMessageTextSafe(ctx, text, {
        parse_mode: 'HTML',
        ...Keyboards.modelList(brandKey)
      });
    });

    // Model Selected ➔ Show Sensi Card
    bot.action(/^btn_model_([^_]+)_(.+)$/, async (ctx) => {
      const brandKey = ctx.match[1];
      const modelKey = ctx.match[2];

      const profile = SensiEngine.getProfile(brandKey, modelKey);
      if (!profile) {
        return ctx.answerCbQuery('Profile not found', { show_alert: true });
      }

      await ctx.answerCbQuery(`⚡ ${profile.name}`);
      const text = Messages.sensiCard(profile);

      await editMessageTextSafe(ctx, text, {
        parse_mode: 'HTML',
        ...Keyboards.sensiActions(brandKey)
      });
    });

    // Redeem Codes Menu
    bot.action('btn_menu_redeem', async (ctx) => {
      await ctx.answerCbQuery('🎁 Loading active vouchers...');
      const codes = await RedeemService.fetchLiveCodes('all');
      const text = Messages.redeemCodesCard(codes, 'All Servers (Select Below)');

      await editMessageTextSafe(ctx, text, {
        parse_mode: 'HTML',
        ...Keyboards.redeemActions('all')
      });
    });

    // Region Switcher for Redeem Codes
    bot.action(/^btn_region_(.+)$/, async (ctx) => {
      const regionKey = ctx.match[1];
      const regions = RedeemService.getRegions();
      const regionObj = regions.find(r => r.key === regionKey) || regions[0];

      await ctx.answerCbQuery(`Loaded ${regionObj.label}`);
      const codes = await RedeemService.fetchLiveCodes(regionKey);
      const text = Messages.redeemCodesCard(codes, regionObj.label);

      await editMessageTextSafe(ctx, text, {
        parse_mode: 'HTML',
        ...Keyboards.redeemActions(regionKey)
      });
    });

    // Nickname Styler Menu
    bot.action('btn_menu_nick', async (ctx) => {
      await ctx.answerCbQuery('🔤 Nickname Generator');
      const name = ctx.from.first_name || 'VENOM';
      const styledList = NicknameStyler.generateAll(name);
      const text = Messages.nicknameCard(name, styledList);

      await editMessageTextSafe(ctx, text, {
        parse_mode: 'HTML',
        ...Keyboards.backToMenu()
      });
    });

    // Custom Room Menu
    bot.action('btn_menu_room', async (ctx) => {
      await ctx.answerCbQuery();
      const text = `
🎮 <b>CREATE A TOURNAMENT ROOM ANNOUNCEMENT</b>
━━━━━━━━━━━━━━━━━━━━━━━━━━
To generate a room card for your guild or group chat, send:
<code>/room &lt;ROOM_ID&gt; &lt;PASSWORD&gt; [MAP]</code>

<b>Example:</b>
<code>/room 84920194 1234 Bermuda</code>
`.trim();

      await editMessageTextSafe(ctx, text, {
        parse_mode: 'HTML',
        ...Keyboards.backToMenu()
      });
    });

    // Search Prompt
    bot.action('btn_search_prompt', async (ctx) => {
      await ctx.answerCbQuery();
      await editMessageTextSafe(ctx, Messages.searchPrompt(), {
        parse_mode: 'HTML',
        ...Keyboards.backToMenu()
      });
    });

    // Help Guide
    bot.action('btn_help', async (ctx) => {
      await ctx.answerCbQuery();
      await editMessageTextSafe(ctx, Messages.helpGuide(), {
        parse_mode: 'HTML',
        ...Keyboards.backToMenu()
      });
    });
  }
}
