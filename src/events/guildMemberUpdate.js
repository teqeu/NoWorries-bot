import db from '../database.js';
import dayjs from 'dayjs';

export default {
  name: 'guildMemberAdd',
  async execute(member) {
    try {
      const date = dayjs().format('YYYY-MM-DD');
      const stmt = db.prepare(`
        INSERT INTO members (guildId, type, count, date)
        VALUES (?, 'join', 1, ?)
        ON CONFLICT(guildId, type, date)
        DO UPDATE SET count = count + 1
      `);
      stmt.run(member.guild.id, date);
    } catch (err) {
      console.error('Failed to track join:', err);
    }
  }
};

export const guildMemberRemove = {
  name: 'guildMemberRemove',
  async execute(member) {
    try {
      const date = dayjs().format('YYYY-MM-DD');
      const stmt = db.prepare(`
        INSERT INTO members (guildId, type, count, date)
        VALUES (?, 'leave', 1, ?)
        ON CONFLICT(guildId, type, date)
        DO UPDATE SET count = count + 1
      `);
      stmt.run(member.guild.id, date);
    } catch (err) {
      console.error('Failed to track leave:', err);
    }
  }
};
