import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { setLogChannel } from '../utils/guildConfig.js';

export default {
  data: new SlashCommandBuilder()
    .setName('setlog')
    .setDescription('Set the logging channel for this server')
    .addChannelOption(option => 
      option
        .setName('channel')
        .setDescription('Select the channel for logs')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    setLogChannel(interaction.guild.id, channel.id);

    await interaction.reply({
      content: `✅ Log channel set to ${channel}`,
      ephemeral: true
    });
  }
};
