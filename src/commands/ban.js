import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder
} from "discord.js";
import { sendLog } from "../utils/guildConfig.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a user")
    .addUserOption(opt =>
      opt.setName("user").setDescription("User to ban").setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName("reason").setDescription("Reason")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason") || "No reason provided";

    await interaction.guild.members.ban(user.id, { reason });

    const embed = new EmbedBuilder()
      .setTitle("User Banned")
      .setColor("Red")
      .addFields(
        { name: "User", value: `${user.tag} (${user.id})` },
        { name: "Moderator", value: interaction.user.tag },
        { name: "Reason", value: reason }
      )
      .setTimestamp();

    // Log the action
    await sendLog(interaction.guild, { embeds: [embed] });

    await interaction.reply(`${user.tag} has been banned.`);
  }
};
