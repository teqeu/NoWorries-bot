import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder
} from "discord.js";
import { sendLog } from "../utils/guildConfig.js";

export default {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban a user by ID")
    .addStringOption(opt =>
      opt.setName("userid")
        .setDescription("The ID of the user to unban")
        .setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName("reason")
        .setDescription("Reason for unbanning")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const userId = interaction.options.getString("userid");
    const reason = interaction.options.getString("reason") || "No reason provided";

    let user;
    try {
      user = await interaction.client.users.fetch(userId);
      await interaction.guild.members.unban(userId, reason);
    } catch {
      return interaction.reply("User is not banned or the ID is invalid.");
    }

    const embed = new EmbedBuilder()
      .setTitle("User Unbanned")
      .setColor("Green")
      .addFields(
        { name: "User", value: `${user.tag} (${user.id})` },
        { name: "Moderator", value: interaction.user.tag },
        { name: "Reason", value: reason }
      )
      .setTimestamp();

    await sendLog(interaction.guild, { embeds: [embed] });

    await interaction.reply(`${user.tag} has been unbanned.`);
  }
};
