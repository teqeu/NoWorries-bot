import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Show a user's avatar")
    .addUserOption(option =>
      option
        .setName("user")
        .setDescription("The user to get the avatar of")
        .setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user") || interaction.user;

    const embed = new EmbedBuilder()
      .setTitle(`${user.tag}'s Avatar`)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setColor("Random")
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};
