import Database from 'better-sqlite3';

const db = new Database('./insights.sqlite');

// Messages per user per channel per day
db.prepare(`
CREATE TABLE IF NOT EXISTS messages (
    guildId TEXT,
    userId TEXT,
    channelId TEXT,
    count INTEGER DEFAULT 0,
    date TEXT,
    PRIMARY KEY (guildId, userId, channelId, date)
)`).run();

// Joins/Leaves per day
db.prepare(`
CREATE TABLE IF NOT EXISTS members (
    guildId TEXT,
    type TEXT, -- 'join' or 'leave'
    count INTEGER DEFAULT 0,
    date TEXT,
    PRIMARY KEY (guildId, type, date)
)`).run();

export default db;
