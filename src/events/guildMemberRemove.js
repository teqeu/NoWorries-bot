import { getLogChannel } from '../utils/guildConfig.js';
import { EmbedBuilder } from 'discord.js';

export default {
  name: 'guildMemberRemove',
  async execute(member) {
    const channelId = getLogChannel(member.guild.id);
    if (!channelId) return;

    const channel = member.guild.channels.cache.get(channelId);
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setTitle('Member Left')
      .setColor('Red')
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
