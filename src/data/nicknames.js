export class NicknameStyler {
  static styles = [
    { name: "Clan King", transform: (n) => `亗 ${n.toUpperCase()} 亗` },
    { name: "Ghost Shadow", transform: (n) => `꧁༺${n.toUpperCase()}༻꧂` },
    { name: "Venom Lightning", transform: (n) => `⚡ ${n.toUpperCase()} ⚡` },
    { name: "Star Warrior", transform: (n) => `★彡[${n}]彡★` },
    { name: "Dark Angel", transform: (n) => `✞ ${n.toUpperCase()} ✞` },
    { name: "Assassin Cross", transform: (n) => `乂 ${n.toUpperCase()} 乂` },
    { name: "Pro Gamer Tag", transform: (n) => `〆 ${n.toUpperCase()} 〆` },
    { name: "Royal Crown", transform: (n) => `👑 𝓥𝓔𝓝𝓞𝓜 • ${n} 👑` },
    { name: "Demon Skull", transform: (n) => `☠️ ${n.toUpperCase()} ☠️` },
    { name: "VIP Elite", transform: (n) => `『VIP』• ${n}` },
    { name: "Esports Tag", transform: (n) => `⚡VN•${n.toUpperCase()}⚡` },
    { name: "Double Struck", transform: (n) => NicknameStyler.toFont(n, "double") },
    { name: "Gothic Blackletter", transform: (n) => NicknameStyler.toFont(n, "gothic") },
    { name: "Small Caps", transform: (n) => NicknameStyler.toFont(n, "smallcaps") },
    { name: "Wide Monospace", transform: (n) => n.split('').join(' ') },
    { name: "Cursive Script", transform: (n) => NicknameStyler.toFont(n, "cursive") },
    { name: "Headshot Master", transform: (n) => `🎯 ${n} 🎯` },
    { name: "One Tap God", transform: (n) => `１ＴＡＰ・${n.toUpperCase()}` },
    { name: "Slayer Symbol", transform: (n) => `⚔️ ${n.toUpperCase()} ⚔️` }
  ];

  static toFont(text, type) {
    const fonts = {
      double: {
        a: "𝕒", b: "𝕓", c: "𝕔", d: "𝕕", e: "𝕖", f: "𝕗", g: "𝕘", h: "𝕙", i: "𝕚", j: "𝕛", k: "𝕜", l: "𝕝", m: "𝕞",
        n: "𝕟", o: "𝕠", p: "𝕡", q: "𝕢", r: "𝕣", s: "𝕤", t: "𝕥", u: "𝕦", v: "𝕧", w: "𝕨", x: "𝕩", y: "𝕪", z: "𝕫",
        A: "𝔸", B: "𝔹", C: "ℂ", D: "𝔻", E: "𝔼", F: "𝔽", G: "𝔾", H: "ℍ", I: "𝕀", J: "𝕁", K: "𝕂", L: "𝕃", M: "𝕄",
        N: "ℕ", O: "𝕆", P: "ℙ", Q: "ℚ", R: "ℝ", S: "𝕊", T: "𝕋", U: "𝕌", V: "𝕍", W: "𝕎", X: "𝕏", Y: "𝕐", Z: "ℤ"
      },
      gothic: {
        a: "𝖆", b: "𝖇", c: "𝖈", d: "𝖉", e: "𝖊", f: "𝖋", g: "𝖌", h: "𝖍", i: "𝖎", j: "𝖏", k: "𝖐", l: "𝖑", m: "𝖒",
        n: "𝖓", o: "𝖔", p: "𝖕", q: "𝖖", r: "𝖗", s: "𝖘", t: "𝖙", u: "𝖚", v: "𝖛", w: "𝖜", x: "𝖝", y: "𝖞", z: "𝖟",
        A: "𝕬", B: "𝕭", C: "𝕮", D: "𝕯", E: "𝕰", F: "𝕱", G: "𝕲", H: "𝕳", I: "𝕴", J: "𝕵", K: "𝕶", L: "𝕷", M: "𝕸",
        N: "𝕹", O: "𝕺", P: "𝕻", Q: "𝕼", R: "𝕽", S: "𝕾", T: "𝕿", U: "𝖀", V: "𝖁", W: "𝖂", X: "𝖃", Y: "𝖄", Z: "𝖅"
      },
      smallcaps: {
        a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ғ", g: "ɢ", h: "ʜ", i: "ɪ", j: "ᴊ", k: "ᴋ", l: "ʟ", m: "ᴍ",
        n: "ɴ", o: "ᴏ", p: "ᴘ", q: "ǫ", r: "ʀ", s: "s", t: "ᴛ", u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ",
        A: "ᴀ", B: "ʙ", C: "ᴄ", D: "ᴅ", E: "ᴇ", F: "ғ", G: "ɢ", H: "ʜ", I: "ɪ", J: "ᴊ", K: "ᴋ", L: "ʟ", M: "ᴍ",
        N: "ɴ", O: "ᴏ", P: "ᴘ", Q: "ǫ", R: "ʀ", S: "s", T: "ᴛ", U: "ᴜ", V: "ᴠ", W: "ᴡ", X: "x", Y: "ʏ", Z: "ᴢ"
      },
      cursive: {
        a: "𝒶", b: "𝒷", c: "𝒸", d: "𝒹", e: "ℯ", f: "𝒻", g: "ℊ", h: "𝒽", i: "𝒾", j: "𝒿", k: "𝓀", l: "𝓁", m: "𝓂",
        n: "𝓃", o: "ℴ", p: "𝓅", q: "𝓆", r: "𝓇", s: "𝓈", t: "𝓉", u: "𝓊", v: "𝓋", w: "𝓌", x: "𝓍", y: "𝓎", z: "𝓏",
        A: "𝒜", B: "ℬ", C: "𝒞", D: "𝒟", E: "ℰ", F: "ℱ", G: "𝒢", H: "ℋ", I: "ℐ", J: "𝒥", K: "𝒦", L: "ℒ", M: "ℳ",
        N: "𝒩", O: "𝒪", P: "𝒫", Q: "𝒬", R: "ℛ", S: "𝒮", T: "𝒯", U: "𝒰", V: "𝒱", W: "𝒲", X: "𝒳", Y: "𝒴", Z: "𝒵"
      }
    };

    const map = fonts[type] || {};
    return text.split('').map(c => map[c] || c).join('');
  }

  static generateAll(name = 'VENOM') {
    const clean = name.trim().slice(0, 12);
    return this.styles.map(s => ({
      name: s.name,
      styled: s.transform(clean)
    }));
  }
}
