import { getLogChannel } from '../utils/guildConfig.js';
import { EmbedBuilder } from 'discord.js';
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
      console.error('Failed to track join for insights:', err);
    }

    const channelId = getLogChannel(member.guild.id);
    if (!channelId) return;

    const channel = member.guild.channels.cache.get(channelId);
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setTitle('Member Joined')
      .setColor('Green')
      .setThumbnail(member.user.displayAvatarURL())
      .addFields(
        { name: 'User', value: `${member.user.tag}`, inline: true },
        { name: 'ID', value: `${member.id}`, inline: true },
        { name: 'Total Members', value: `${member.guild.memberCount}`, inline: true }
      )
      .setTimestamp();

    channel.send({ embeds: [embed] });
  }
};
