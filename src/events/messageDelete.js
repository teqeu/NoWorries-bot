import { getLogChannel } from '../utils/guildConfig.js';
import { EmbedBuilder } from 'discord.js';

export default {
  name: 'messageDelete',
  async execute(message) {
    if (message.partial) await message.fetch();
    if (!message.guild) return;

    const channelId = getLogChannel(message.guild.id);
    if (!channelId) return;

    const logChannel = message.guild.channels.cache.get(channelId);
    if (!logChannel) return;

    const embed = new EmbedBuilder()
      .setTitle('Message Deleted')
      .setColor('DarkRed')
      .addFields(
        { name: 'Author', value: `${message.author.tag}`, inline: true },
        { name: 'Channel', value: `<#${message.channel.id}>`, inline: true },
        { name: 'Content', value: message.content || 'No content' }
      )
      .setTimestamp();

    logChannel.send({ embeds: [embed] });
  }
};
