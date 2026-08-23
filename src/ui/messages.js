export class Messages {
  static escapeHtml(str = '') {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  static welcome(user) {
    const name = this.escapeHtml(user?.first_name || 'Gamer');
    return `
⚡ <b>VENOM FREE FIRE • PRO GAMING HUB</b>

Hey <b>${name}</b>! Welcome to the #1 Garena Free Fire companion bot.

🎯 <b>What I Can Do:</b>
• <b>Exact 0–200 Sensi:</b> Calibrated settings for 100+ phone models & PC.
• 🎁 <b>Server Redeem Codes:</b> Working vouchers filtered by your region.
• 🔍 <b>Player UID Stalker:</b> Check level, rank, likes & guild stats.
• 🔤 <b>Clan Nickname Styler:</b> 20+ pro symbol tags & fonts.
• 🎮 <b>Tournament Room:</b> 1-click custom room announcer.

👇 <i>Select a category below to get started:</i>
`.trim();
  }

  static sensiCard(profile, icon = '📱') {
    return `
⚡ <b>VENOM HEADSHOT SENSI (0–200)</b>
━━━━━━━━━━━━━━━━━━━━━━━━━━
${icon} <b>DEVICE:</b> <b>${this.escapeHtml(profile.name)}</b>
━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 <b>General:</b> <code>${profile.general}</code>
🔴 <b>Red Dot:</b> <code>${profile.redDot}</code>
🔍 <b>2x Scope:</b> <code>${profile.scope2x}</code>
🔭 <b>4x Scope:</b> <code>${profile.scope4x}</code>
🎯 <b>Sniper Scope:</b> <code>${profile.sniper}</code>
👀 <b>Free Look:</b> <code>${profile.freeLook}</code>
━━━━━━━━━━━━━━━━━━━━━━━━━━
🔘 <b>Fire Button Size:</b> <code>${profile.buttonSize}</code>
⚙️ <b>DPI / Refresh:</b> <code>${profile.dpi}</code>
🕹️ <b>Drag Style:</b> <i>${profile.technique}</i>
🔫 <b>Best Guns:</b> <code>${profile.recommendedGuns}</code>
${profile.notes ? `💡 <i>${profile.notes}</i>\n` : ''}━━━━━━━━━━━━━━━━━━━━━━━━━━
<i>(Enter these exact numbers in Free Fire Settings ➔ Sensitivity)</i>
`.trim();
  }

  static playerProfileCard(profile) {
    return `
⚡ <b>FREE FIRE PLAYER PROFILE</b>
━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 <b>Nickname:</b> <b>${this.escapeHtml(profile.nickname)}</b>
🆔 <b>UID:</b> <code>${profile.uid}</code> <i>(Tap to copy)</i>
━━━━━━━━━━━━━━━━━━━━━━━━━━
⭐ <b>Level:</b> <code>${profile.level}</code> (EXP: ${profile.exp})
👍 <b>Likes:</b> <code>${profile.likes}</code>
🏆 <b>BR Rank:</b> <code>${profile.brRank}</code>
⚔️ <b>CS Rank:</b> <code>${profile.csRank}</code>
🏰 <b>Guild:</b> <code>${this.escapeHtml(profile.guildName)} (${profile.guildLevel})</code>
🌐 <b>Region:</b> <code>${profile.region}</code>
━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 <b>Signature:</b> <i>"${this.escapeHtml(profile.bio)}"</i>
`.trim();
  }

  static redeemCodesCard(codes = [], regionLabel = 'All Servers') {
    let text = `🎁 <b>FREE FIRE REDEEM CODES</b>\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `🌐 <b>Selected Server:</b> <b>${this.escapeHtml(regionLabel)}</b>\n`;
    text += `<i>(Tap any code below to copy to clipboard)</i>\n\n`;

    for (const c of codes) {
      text += `🔑 <code>${c.code}</code>\n`;
      text += `🎁 <b>Reward:</b> ${c.reward}\n`;
      text += `📍 <b>Valid Server:</b> <code>${c.server}</code>\n\n`;
    }

    text += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `👉 <i>Select your exact server region below to avoid region errors!</i>\n`;
    return text.trim();
  }

  static nicknameCard(name, styledList = []) {
    let text = `🔤 <b>PRO NICKNAMES FOR "${this.escapeHtml(name)}"</b>\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `<i>Tap any styled tag to copy:</i>\n\n`;

    for (const item of styledList) {
      text += `<code>${this.escapeHtml(item.styled)}</code>\n`;
    }

    text += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `💡 <i>Use in Free Fire Nickname Change / Guild Tag!</i>\n`;
    return text.trim();
  }

  static customRoomCard(roomId, password, map = 'Bermuda', mode = 'Clash Squad (4v4)') {
    return `
🎮 <b>VENOM TOURNAMENT CUSTOM ROOM</b>
━━━━━━━━━━━━━━━━━━━━━━━━━━
🆔 <b>ROOM ID:</b>
👉 <code>${this.escapeHtml(roomId)}</code> 👈

🔑 <b>PASSWORD:</b>
👉 <code>${this.escapeHtml(password)}</code> 👈
━━━━━━━━━━━━━━━━━━━━━━━━━━
🗺️ <b>Map:</b> <code>${this.escapeHtml(map)}</code>
⚔️ <b>Mode:</b> <code>${this.escapeHtml(mode)}</code>
⚡ <b>Rules:</b> <i>No Grenades • No Character Skills (Standard 500 Coin)</i>
━━━━━━━━━━━━━━━━━━━━━━━━━━
<i>(Copy Room ID & Password to join match now!)</i>
`.trim();
  }

  static searchPrompt() {
    return `
🔍 <b>SEARCH YOUR PHONE MODEL</b>

Send the name of your phone model using:
<code>/sensi your phone model</code>

<b>Examples:</b>
• <code>/sensi iphone 13</code>
• <code>/sensi hot 30</code>
• <code>/sensi poco x3</code>
• <code>/sensi a54</code>
• <code>/sensi camon 20</code>
`.trim();
  }

  static helpGuide() {
    return `
🎯 <b>VENOM PRO ONE-TAP DRAG GUIDE</b>
━━━━━━━━━━━━━━━━━━━━━━━━━━
1️⃣ <b>Straight Drag (Mid-Range):</b>
Pull your fire button straight up smoothly towards the enemy's head.

2️⃣ <b>J-Drag (Close Range / Shotgun):</b>
Pull the fire button down slightly, then swing in a 'J' shape up towards the head.

3️⃣ <b>Rotation Drag (Running Target):</b>
Drag your fire button in the exact direction the enemy is sprinting.

4️⃣ <b>Button Placement:</b>
Set your Fire Button Size to <b>44%–48%</b> and place it low on the bottom-right of your screen for maximum drag space.
━━━━━━━━━━━━━━━━━━━━━━━━━━
`.trim();
  }
}
