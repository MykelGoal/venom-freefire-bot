export class RedeemService {
  static serverCodes = {
    global: [
      {
        code: "FF11-NJN5-YS3E",
        reward: "Season Gun Crate & Gold Voucher",
        server: "Global (All Servers)",
        status: "🟢 Active"
      },
      {
        code: "FFAC-2YXE-6RF2",
        reward: "Diamond Royale Voucher & Emote Box",
        server: "Global / Multi-Region",
        status: "🟢 Active"
      }
    ],
    india: [
      {
        code: "FFIN-D928-1KLS",
        reward: "Titan Scar Gun Box & 2x Incubator Voucher",
        server: "India (IND) / PK / BD",
        status: "🟢 Active"
      },
      {
        code: "FF10-GCGX-RNHY",
        reward: "Wiggle Walk Emote & Diamond Voucher",
        server: "India Server",
        status: "🟢 Active"
      },
      {
        code: "FFAC-2YXE-6RF2",
        reward: "Green Criminal Token Crate",
        server: "India & Bangladesh",
        status: "🟢 Active"
      }
    ],
    indonesia: [
      {
        code: "FF9M-J31C-XKRG",
        reward: "Champion Bundle & Pet Dreki",
        server: "Indonesia (ID) / SG",
        status: "🟢 Active"
      },
      {
        code: "FF11-WFNP-P956",
        reward: "50x Universal Fragments & Room Card",
        server: "Indonesia Server",
        status: "🟢 Active"
      },
      {
        code: "FF11-64XN-JZ2V",
        reward: "M1887 Winterland Skin Crate",
        server: "Indonesia Server",
        status: "🟢 Active"
      }
    ],
    brazil: [
      {
        code: "FFCO-8BS5-JW2D",
        reward: "Green Criminal Token Box & 100 Diamonds",
        server: "Brazil (BR) / LATAM",
        status: "🟢 Active"
      },
      {
        code: "FFBR-9X2L-PKWS",
        reward: "Dino Bundle Crate & Magic Cube Fragment",
        server: "Brazil / SAC",
        status: "🟢 Active"
      }
    ],
    mena_africa: [
      {
        code: "FFME-8492-01KL",
        reward: "Evo Gun Upgrade Tokens (MP40 Cobra)",
        server: "MENA & Africa Server",
        status: "🟢 Active"
      },
      {
        code: "FF11-NJN5-YS3E",
        reward: "Alok Character Bundle Box",
        server: "MENA / Africa",
        status: "🟢 Active"
      }
    ],
    europe: [
      {
        code: "FFEU-2940-19LK",
        reward: "Diamond Royale Voucher + Gun Crate",
        server: "Europe (EU) / RU",
        status: "🟢 Active"
      }
    ]
  };

  static getCodesByRegion(regionKey = 'all') {
    if (regionKey === 'all' || !this.serverCodes[regionKey]) {
      // Return a combination from top regions
      return [
        ...this.serverCodes.global,
        this.serverCodes.india[0],
        this.serverCodes.indonesia[0],
        this.serverCodes.brazil[0],
        this.serverCodes.mena_africa[0]
      ];
    }
    return this.serverCodes[regionKey] || this.serverCodes.global;
  }

  static getRegions() {
    return [
      { key: "all", label: "🌐 All Servers" },
      { key: "india", label: "🇮🇳 India / BD / PK" },
      { key: "indonesia", label: "🇮🇩 Indonesia / SG" },
      { key: "brazil", label: "🇧🇷 Brazil / LATAM" },
      { key: "mena_africa", label: "🌍 MENA & Africa" },
      { key: "europe", label: "🇪🇺 Europe / RU" }
    ];
  }

  static getRedemptionUrl() {
    return "https://reward.ff.garena.com/en";
  }
}
