import { Markup } from 'telegraf';
import { SensiEngine } from '../services/sensiEngine.js';
import { RedeemService } from '../services/redeemService.js';

export class Keyboards {
  /**
   * Main Dashboard
   */
  static mainMenu() {
    return Markup.inlineKeyboard([
      [
        Markup.button.callback('🎯 Headshot Sensi (0–200)', 'btn_menu_sensi'),
        Markup.button.callback('🎁 Redeem Codes', 'btn_menu_redeem')
      ],
      [
        Markup.button.callback('🔍 Player UID Stalker', 'btn_menu_player'),
        Markup.button.callback('🔤 Nickname Styler', 'btn_menu_nick')
      ],
      [
        Markup.button.callback('⚡ Explore VENOM Bots', 'btn_venom_series'),
        Markup.button.callback('🎮 Custom Room', 'btn_menu_room')
      ]
    ]);
  }

  /**
   * YouTube Subscription Gate Keyboard
   */
  static subscriptionGate() {
    return Markup.inlineKeyboard([
      [
        Markup.button.url('🔴 Subscribe on YouTube (@venommdbot)', 'https://www.youtube.com/@venommdbot?sub_confirmation=1')
      ],
      [
        Markup.button.callback('✅ I Have Subscribed / Unlock Bot', 'btn_verify_sub')
      ]
    ]);
  }

  /**
   * Explore VENOM Series Actions
   */
  static exploreSeries() {
    return Markup.inlineKeyboard([
      [
        Markup.button.url('📺 Subscribe on YouTube (@venommdbot)', 'https://www.youtube.com/@venommdbot?sub_confirmation=1')
      ],
      [
        Markup.button.callback('⬅️ Back to Menu', 'btn_main_menu')
      ]
    ]);
  }

  /**
   * Brand Selector Keyboard
   */
  static brandList() {
    const brands = SensiEngine.getBrands();
    const rows = [];

    for (let i = 0; i < brands.length; i += 2) {
      const row = [];
      row.push(Markup.button.callback(`${brands[i].icon} ${brands[i].brand}`, `btn_brand_${brands[i].key}`));
      if (brands[i + 1]) {
        row.push(Markup.button.callback(`${brands[i + 1].icon} ${brands[i + 1].brand}`, `btn_brand_${brands[i + 1].key}`));
      }
      rows.push(row);
    }

    rows.push([Markup.button.callback('⬅️ Back to Menu', 'btn_main_menu')]);
    return Markup.inlineKeyboard(rows);
  }

  /**
   * Model Selector Keyboard for a Brand
   */
  static modelList(brandKey) {
    const models = SensiEngine.getModels(brandKey);
    const rows = [];

    for (const m of models) {
      rows.push([Markup.button.callback(`📱 ${m.name}`, `btn_model_${brandKey}_${m.modelKey}`)]);
    }

    rows.push([
      Markup.button.callback('⬅️ Back to Brands', 'btn_menu_sensi'),
      Markup.button.callback('🏠 Main Menu', 'btn_main_menu')
    ]);

    return Markup.inlineKeyboard(rows);
  }

  /**
   * Sensitivity Card Actions
   */
  static sensiActions(brandKey) {
    return Markup.inlineKeyboard([
      [
        Markup.button.callback('📱 Change Model', `btn_brand_${brandKey}`),
        Markup.button.callback('🎁 Redeem Codes', 'btn_menu_redeem')
      ],
      [
        Markup.button.callback('🏠 Main Menu', 'btn_main_menu')
      ]
    ]);
  }

  /**
   * Redeem Codes Action Buttons with Server Region Switcher
   */
  static redeemActions(activeRegion = 'all') {
    const regions = RedeemService.getRegions();
    const rows = [];

    for (let i = 0; i < regions.length; i += 2) {
      const row = [];
      const isA = regions[i].key === activeRegion;
      row.push(Markup.button.callback(`${isA ? '✅ ' : ''}${regions[i].label}`, `btn_region_${regions[i].key}`));

      if (regions[i + 1]) {
        const isB = regions[i + 1].key === activeRegion;
        row.push(Markup.button.callback(`${isB ? '✅ ' : ''}${regions[i + 1].label}`, `btn_region_${regions[i + 1].key}`));
      }
      rows.push(row);
    }

    rows.push([
      Markup.button.url('🔗 Garena Official Redeem Site', RedeemService.getRedemptionUrl())
    ]);

    rows.push([
      Markup.button.callback('🎯 Headshot Sensi', 'btn_menu_sensi'),
      Markup.button.callback('🏠 Main Menu', 'btn_main_menu')
    ]);

    return Markup.inlineKeyboard(rows);
  }

  /**
   * Back Button to Main Menu
   */
  static backToMenu() {
    return Markup.inlineKeyboard([
      [Markup.button.callback('⬅️ Back to Dashboard', 'btn_main_menu')]
    ]);
  }
}
