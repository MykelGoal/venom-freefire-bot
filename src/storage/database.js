import fs from 'fs';
import path from 'path';

class FreeFireDatabase {
  constructor(filePath = './data/database.json') {
    this.filePath = filePath;
    this.data = {
      users: {},
      stats: {
        totalSensiSearches: 0,
        totalPlayerLookups: 0,
        totalRedeemClicks: 0
      }
    };
    this.init();
  }

  init() {
    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        this.data = { ...this.data, ...JSON.parse(raw) };
      } else {
        this.save();
      }
    } catch {
      // memory fallback
    }
  }

  save() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch {}
  }

  getUser(userId) {
    return this.data.users[String(userId)] || null;
  }

  isUserVerified(userId) {
    const user = this.getUser(userId);
    return Boolean(user && user.isVerified);
  }

  verifyUser(userId) {
    const id = String(userId);
    if (!this.data.users[id]) {
      this.data.users[id] = { id, isVerified: true, createdAt: Date.now() };
    } else {
      this.data.users[id].isVerified = true;
    }
    this.save();
  }
}

export const db = new FreeFireDatabase('./data/database.json');
