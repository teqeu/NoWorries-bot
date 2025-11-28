import { getLogChannel } from '../utils/guildConfig.js';
import { EmbedBuilder } from 'discord.js';

export default {
  name: 'messageUpdate',
  async execute(oldMessage, newMessage) {
    if (oldMessage.partial) await oldMessage.fetch();
    if (newMessage.partial) await newMessage.fetch();
    if (!oldMessage.guild) return;
    if (oldMessage.content === newMessage.content) return;

    const channelId = getLogChannel(oldMessage.guild.id);
    if (!channelId) return;

    const logChannel = oldMessage.guild.channels.cache.get(channelId);
    if (!logChannel) return;

    const embed = new EmbedBuilder()
      .setTitle('Message Edited')
      .setColor('Orange')
      .addFields(
        { name: 'Author', value: `${oldMessage.author.tag}`, inline: true },
        { name: 'Channel', value: `<#${oldMessage.channel.id}>`, inline: true },
        { name: 'Before', value: oldMessage.content || 'No content' },
        { name: 'After', value: newMessage.content || 'No content' }
      )
      .setTimestamp();

    logChannel.send({ embeds: [embed] });
  }
};