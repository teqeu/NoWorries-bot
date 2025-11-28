import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Displays detailed information about this server.'),

  async execute(interaction) {
    // Defer reply immediately
    await interaction.deferReply();

    const { guild } = interaction;

    // Fetch members to get accurate counts
    await guild.members.fetch();

    const totalMembers = guild.memberCount;
    const onlineMembers = guild.members.cache.filter(
      m => m.presence?.status === 'online' || m.presence?.status === 'idle' || m.presence?.status === 'dnd'
    ).size;

    const totalBots = guild.members.cache.filter(m => m.user.bot).size;

    const embed = new EmbedBuilder()
      .setTitle(`${guild.name} - Server Information`)
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setColor('Blue')
      .addFields(
        { name: 'Server ID', value: guild.id, inline: true },
        { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
        { name: 'Created On', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:D>`, inline: true },
        { name: 'Total Members', value: `${totalMembers}`, inline: true },
        { name: 'Online Members', value: `${onlineMembers}`, inline: true },
        { name: 'Bots', value: `${totalBots}`, inline: true },
        { name: 'Roles', value: `${guild.roles.cache.size}`, inline: true },
        { name: 'Boost Level', value: `${guild.premiumTier}`, inline: true },
        { name: 'Boost Count', value: `${guild.premiumSubscriptionCount}`, inline: true },
        { name: 'Channels', value: `${guild.channels.cache.size}`, inline: true }
      )
      .setFooter({ text: `Server ID: ${guild.id}` })
      .setTimestamp();

    // Edit deferred reply
    await interaction.editReply({ embeds: [embed] });
  }
};
