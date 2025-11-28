import { SlashCommandBuilder } from 'discord.js';

const afkMap = new Map(); // { reason, timestamp }

export default {
  data: new SlashCommandBuilder()
    .setName('afk')
    .setDescription('Set yourself as AFK.')
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Reason for going AFK')
        .setRequired(false)
    ),

  async execute(interaction) {
    const reason = interaction.options.getString('reason') || 'AFK';
    afkMap.set(interaction.user.id, { reason, timestamp: Date.now() });

    await interaction.reply({
      content: `✅ You are now AFK: ${reason}`,
      ephemeral: true
    });
  },

  afkMap 
};
