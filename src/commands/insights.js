import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import db from '../database.js';

export default {
  data: new SlashCommandBuilder()
    .setName('insights')
    .setDescription('View server message & member stats'),

  async execute(interaction) {
    const guildId = interaction.guild.id;

    const topChannels = db.prepare(`
      SELECT channelId, SUM(count) as total
      FROM messages
      WHERE guildId = ?
      GROUP BY channelId
      ORDER BY total DESC
      LIMIT 5
    `).all(guildId);

    const topChannelsText = topChannels.length
      ? topChannels.map((c, i) => `${i + 1}. <#${c.channelId}> — ${c.total} messages`).join('\n')
      : 'No data';

    const topUsers = db.prepare(`
      SELECT userId, SUM(count) as total
      FROM messages
      WHERE guildId = ?
      GROUP BY userId
      ORDER BY total DESC
      LIMIT 5
    `).all(guildId);

    const topUsersText = topUsers.length
      ? topUsers.map((u, i) => `${i + 1}. <@${u.userId}> — ${u.total} messages`).join('\n')
      : 'No data';

    const joins = db.prepare(`
      SELECT SUM(count) as total
      FROM members
      WHERE guildId = ? AND type='join'
    `).get(guildId)?.total || 0;

    const leaves = db.prepare(`
      SELECT SUM(count) as total
      FROM members
      WHERE guildId = ? AND type='leave'
    `).get(guildId)?.total || 0;

    const embed = new EmbedBuilder()
      .setTitle(`${interaction.guild.name} Insights`)
      .addFields(
        { name: 'Top Channels', value: topChannelsText },
        { name: 'Top Users', value: topUsersText },
        { name: 'Total Joins', value: `${joins}`, inline: true },
        { name: 'Total Leaves', value: `${leaves}`, inline: true }
      )
      .setColor('Blue')
      .setTimestamp();

    interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
