import { SlashCommandBuilder } from 'discord.js';
import { clearGuildData } from '../utils/db.js';

export default {
  data: new SlashCommandBuilder()
    .setName('clearinsights')
    .setDescription('Clear this server’s insights data')
    .setDefaultMemberPermissions(8), // ADMINISTRATOR only

  async execute(interaction) {
    clearGuildData(interaction.guild.id);
    await interaction.reply({ content: '✅ This server’s insights data has been cleared.', ephemeral: true });
  }
};
