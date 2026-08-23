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
        Markup.button.callback('🎮 Custom Room Format', 'btn_menu_room'),
        Markup.button.callback('❓ Pro Drag Guide', 'btn_help')
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
   * Redeem Codes Action Buttons
   */
  static redeemActions() {
    return Markup.inlineKeyboard([
      [
        Markup.button.url('🔗 Garena Official Redeem Site', RedeemService.getRedemptionUrl())
      ],
      [
        Markup.button.callback('🔄 Refresh Codes', 'btn_menu_redeem'),
        Markup.button.callback('🎯 Headshot Sensi', 'btn_menu_sensi')
      ],
      [
        Markup.button.callback('🏠 Main Menu', 'btn_main_menu')
      ]
    ]);
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
