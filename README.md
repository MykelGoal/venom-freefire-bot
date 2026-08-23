<div align="center">

# ⚡ VENOM FREE FIRE

### Pro 0–200 Headshot Sensitivity, Daily Redeem Codes & Gaming Utilities for Telegram

[![Node.js](https://img.shields.io/badge/Node.js-20%2B-22c55e?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Telegram](https://img.shields.io/badge/Telegram-Bot%20API-229ED9?style=for-the-badge&logo=telegram&logoColor=white)](https://telegram.org)
[![Telegraf](https://img.shields.io/badge/Framework-Telegraf-0088cc?style=for-the-badge)](https://telegraf.js.org)
[![Scale](https://img.shields.io/badge/FreeFire-0--200%20OB%20Sensi-ff4500?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/License-MIT-8b5cf6?style=for-the-badge)](LICENSE)

**The ultimate all-in-one Free Fire esports companion bot for players, guilds, and tournament hosts.**

[⚡ Quick Deploy](#-deploy-in-60-seconds) • [🎯 Features](#-features) • [🚀 Local Setup](#-local-development) • [📖 Commands](#-bot-commands)

</div>

---

## ✨ Features

* 🎯 **Exact 0–200 Headshot Sensi:** Calibrated for over **100+ phone models** (iPhone, Infinix, Tecno, Samsung, POCO, Redmi, Realme, Oppo, Vivo) and PC Emulators (BlueStacks, MSI, LDPlayer).
* 🔘 **Button Size & DPI:** Gives exact recommended Fire Button Size (`%`), Placement, and Developer Options DPI.
* 🕹️ **Drag Styles:** Specific instructions for Straight Drag, J-Drag, and Rotation Drag per device.
* 🎁 **Daily Working Redeem Codes:** Live Garena gift codes with 1-tap copy & direct links to the official redemption site.
* 🔤 **Clan Nickname Styler:** Instantly converts gamer names into 20+ pro esports tags (`亗 VENOM 亗`, `꧁༺VENOM༻꧂`, `⚡ 𝖁𝕰𝕹𝕺𝕸 ⚡`).
* 🎮 **Tournament Custom Room Announcer:** Generates formatted room cards for guild chats (`/room ID PASS MAP`).
* 🚀 **24/7 Keep-Alive Server:** Built-in Express server with `/ping` endpoint for UptimeRobot monitoring.

---

## 📱 Supported Phone Brands & Models

| Brand | Models Included |
| :--- | :--- |
| **🍎 Apple iPhone** | iPhone 15 Pro Max to iPhone 7 Plus, SE, iPad Pro/Air |
| **⚡ Infinix** | GT 10/20 Pro, Note 30/12 series, Hot 40/30/20/12 series, Zero series, Smart series |
| **🔥 Tecno** | Camon 30/20/19 series, Pova 6/5/4/3 series, Spark 20/10/9 series, Phantom series |
| **🌌 Samsung Galaxy** | S24/S23/S22/S21 Ultra, A54/A53/A52s, A34/A33, A24/A23, A15/A14/A12 |
| **🚀 Xiaomi / POCO / Redmi** | POCO F5/X6/X5 Pro, Redmi Note 13/12/11 series, Redmi 13C/12/10C |
| **🎯 Realme / Oppo / Vivo** | Realme 12/11/10 Pro, C55/C53, Reno series, Vivo V30/V29, Y36/Y27 |
| **💻 PC Emulators** | BlueStacks 5 (X/Y Mouse Sensi), MSI App Player, LDPlayer 9 |

---

## ⚡ Deploy in 60 Seconds

### Deploy to Render
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com)

### Deploy to Railway
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app)

### Deploy with Docker
```bash
docker run -d \
  --name venom-freefire \
  -p 3000:3000 \
  -e BOT_TOKEN="your_telegram_bot_token" \
  ghcr.io/mykelgoal/venom-freefire-bot:latest
```

---

## 🚀 Local Development

### 1. Clone the repository
```bash
git clone https://github.com/MykelGoal/venom-freefire-bot.git
cd venom-freefire-bot
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment
```bash
cp .env.example .env
```
Edit `.env` and set your `BOT_TOKEN`:
```env
BOT_TOKEN=1234567890:ABCdefGhIJKlmNoPQRsTUVwxyZ
PORT=3000
APP_URL=https://your-bot.onrender.com
```

### 4. Run the Bot
```bash
# Development
npm run dev

# Production
npm start
```

---

## 📖 Bot Commands

| Command | Description |
| :--- | :--- |
| `/start` | Open the interactive FreeFire dashboard |
| `/sensi <device>` | Get exact 0–200 sensitivity settings (e.g. `/sensi hot 30` or `/sensi iphone 13`) |
| `/redeem` | View today's verified Garena redeem codes |
| `/nick <name>` | Generate 20+ styled clan nicknames & symbols |
| `/room <id> <pass> [map]` | Generate formatted tournament room announcement |
| `/ping` | Check server latency & 24/7 uptime |
| `/help` | Read pro drag techniques & button placement guide |

---

## 👨‍💻 Author

**MR VENOM (Mychael Goal)**
* GitHub: [@MykelGoal](https://github.com/MykelGoal)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
