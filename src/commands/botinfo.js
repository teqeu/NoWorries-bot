import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Information about this bot.'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('No Worries! Bot')
      .setColor('Purple')
      .setDescription('A self-hosted Discord multi-tool bot. Designed to provide moderation, logging, and utility tools per guild.')
      .addFields(
        { name: 'GitHub', value: '[View on GitHub](https://github.com/teqeu/NoWorries-bot)', inline: true },
        { name: 'Version', value: '1.0.0', inline: true },
        { name: 'Language', value: 'JavaScript (Discord.js v14)', inline: true }
      )
      .setFooter({ text: 'Open-source bot' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};
