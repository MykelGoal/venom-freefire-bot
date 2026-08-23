import { DEVICE_DATABASE } from '../data/devices.js';

export class SensiEngine {
  /**
   * Returns list of all available brands
   */
  static getBrands() {
    return Object.entries(DEVICE_DATABASE).map(([key, data]) => ({
      key,
      brand: data.brand,
      icon: data.icon,
      modelCount: Object.keys(data.models).length
    }));
  }

  /**
   * Returns models for a specific brand
   */
  static getModels(brandKey) {
    const brandData = DEVICE_DATABASE[brandKey];
    if (!brandData) return [];
    return Object.entries(brandData.models).map(([modelKey, model]) => ({
      modelKey,
      ...model
    }));
  }

  /**
   * Retrieves exact sensitivity profile by brand & model key
   */
  static getProfile(brandKey, modelKey) {
    const brandData = DEVICE_DATABASE[brandKey];
    if (!brandData) return null;
    return brandData.models[modelKey] || null;
  }

  /**
   * Search database by text query (e.g. 'hot 30', 'iphone 14', 's23', 'poco')
   */
  static search(query = '') {
    const cleanQuery = query.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!cleanQuery) return [];

    const matches = [];

    for (const [brandKey, brandData] of Object.entries(DEVICE_DATABASE)) {
      for (const [modelKey, model] of Object.entries(brandData.models)) {
        const cleanName = model.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        const cleanKey = modelKey.replace(/[^a-z0-9]/g, '');

        if (cleanName.includes(cleanQuery) || cleanKey.includes(cleanQuery) || cleanQuery.includes(cleanKey)) {
          matches.push({
            brandKey,
            brandIcon: brandData.icon,
            modelKey,
            ...model
          });
        }
      }
    }

    return matches;
  }

  /**
   * Generates dynamic calibrated 0-200 sensitivity for custom specs
   */
  static generateCustom(refreshRate = 60, ramGb = 4) {
    let general = 196;
    let redDot = 184;
    let scope2x = 170;
    let scope4x = 156;
    let sniper = 100;
    let freeLook = 135;
    let dpi = 420;
    let buttonSize = "48%";

    if (refreshRate >= 120) {
      general = 194;
      redDot = 180;
      scope2x = 168;
      scope4x = 154;
      sniper = 95;
      freeLook = 125;
      dpi = 480;
      buttonSize = "44%";
    } else if (refreshRate === 90) {
      general = 195;
      redDot = 182;
      scope2x = 169;
      scope4x = 155;
      sniper = 98;
      freeLook = 130;
      dpi = 450;
      buttonSize = "46%";
    } else {
      // 60Hz
      general = 198;
      redDot = 188;
      scope2x = 175;
      scope4x = 162;
      sniper = 110;
      freeLook = 145;
      dpi = 411;
      buttonSize = "50%";
    }

    return {
      name: `Custom Device (${refreshRate}Hz / ${ramGb}GB RAM)`,
      general,
      redDot,
      scope2x,
      scope4x,
      sniper,
      freeLook,
      buttonSize,
      buttonPos: "Bottom Right",
      dpi: `DPI: ${dpi}`,
      technique: "Fast J-Drag (Close range) / Straight Drag (Mid range)",
      recommendedGuns: "M1887, Desert Eagle, Woodpecker, MP40"
    };
  }
}
