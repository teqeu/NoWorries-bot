import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows all available commands'),

  async execute(interaction) {
    const commands = interaction.client.commands;

    const commandList = commands.map(cmd => `\`/${cmd.data.name}\` — ${cmd.data.description}`).join('\n');

    const embed = new EmbedBuilder()
      .setTitle('Bot Help')
      .setDescription(`Here are all available commands:\n\n${commandList}`)
      .addFields({ name: 'Total Commands', value: `${commands.size}`, inline: true })
      .setColor('Blue')
      .setTimestamp();

    // Reply
    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
