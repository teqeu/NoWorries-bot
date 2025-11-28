import db from '../database.js';
import dayjs from 'dayjs';

export default {
  name: 'messageCreate',
  async execute(message, client) {
    if (!message.guild || message.author.bot) return;

    const afkCommand = client.commands.get('afk');
    const afkMap = afkCommand?.afkMap;
    if (afkMap) {
      if (afkMap.has(message.author.id)) {
        const afkData = afkMap.get(message.author.id);
        afkMap.delete(message.author.id);

        const duration = Date.now() - afkData.timestamp;
        const seconds = Math.floor((duration / 1000) % 60);
        const minutes = Math.floor((duration / (1000 * 60)) % 60);
        const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
        const days = Math.floor(duration / (1000 * 60 * 60 * 24));

        let formatted = '';
        if (days) formatted += `${days}d `;
        if (hours) formatted += `${hours}h `;
        if (minutes) formatted += `${minutes}m `;
        formatted += `${seconds}s`;

        message.reply(`✅ Welcome back! You were AFK for ${formatted}.`);
      }

      message.mentions.users.forEach(user => {
        if (afkMap.has(user.id)) {
          const afkData = afkMap.get(user.id);
          const duration = Date.now() - afkData.timestamp;
          const seconds = Math.floor((duration / 1000) % 60);
          const minutes = Math.floor((duration / (1000 * 60)) % 60);
          const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
          const days = Math.floor(duration / (1000 * 60 * 60 * 24));

          let formatted = '';
          if (days) formatted += `${days}d `;
          if (hours) formatted += `${hours}h `;
          if (minutes) formatted += `${minutes}m `;
          formatted += `${seconds}s`;

          message.reply(`💤 ${user.tag} is AFK: ${afkData.reason} (since ${formatted})`);
        }
      });
    }

    try {
      const date = dayjs().format('YYYY-MM-DD');
      const stmt = db.prepare(`
        INSERT INTO messages (guildId, userId, channelId, count, date)
        VALUES (?, ?, ?, 1, ?)
        ON CONFLICT(guildId, userId, channelId, date)
        DO UPDATE SET count = count + 1
      `);
      stmt.run(message.guild.id, message.author.id, message.channel.id, date);
    } catch (err) {
      console.error('Failed to track message for insights:', err);
    }
  }
};
