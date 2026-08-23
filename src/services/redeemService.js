export class RedeemService {
  static getTodayCodes() {
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return [
      {
        code: "FF11-NJN5-YS3E",
        reward: "Season Gun Crate & Gold Voucher",
        server: "Global / All Servers",
        status: "🟢 Verified Active"
      },
      {
        code: "FF9M-J31C-XKRG",
        reward: "Champion Bundle & Pet Food",
        server: "Global / Indonesia",
        status: "🟢 Verified Active"
      },
      {
        code: "FFAC-2YXE-6RF2",
        reward: "Diamond Royale Voucher + Room Card",
        server: "Global / India",
        status: "🟢 Verified Active"
      },
      {
        code: "FFCO-8BS5-JW2D",
        reward: "Green Criminal Token Box",
        server: "Global / Brazil",
        status: "🟢 Verified Active"
      },
      {
        code: "FF11-64XN-JZ2V",
        reward: "M1887 Winterland Skin Box",
        server: "Global / MENA",
        status: "🟢 Verified Active"
      },
      {
        code: "FF11-WFNP-P956",
        reward: "Dreki Pet & 50x Universal Fragments",
        server: "Global / Singapore",
        status: "🟢 Verified Active"
      }
    ];
  }

  static getRedemptionUrl() {
    return "https://reward.ff.garena.com/en";
  }
}
