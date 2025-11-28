import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder
} from "discord.js";
import { sendLog } from "../utils/guildConfig.js";

export default {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a user")
    .addUserOption(opt =>
      opt.setName("user")
        .setDescription("User to kick")
        .setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName("reason")
        .setDescription("Reason for kicking")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const member = await interaction.guild.members.fetch(user.id);
    const reason = interaction.options.getString("reason") || "No reason provided";

    await member.kick(reason);

    const embed = new EmbedBuilder()
      .setTitle("User Kicked")
      .setColor("Orange")
      .addFields(
        { name: "User", value: `${user.tag} (${user.id})` },
        { name: "Moderator", value: interaction.user.tag },
        { name: "Reason", value: reason }
      )
      .setTimestamp();

    await sendLog(interaction.guild, { embeds: [embed] });

    await interaction.reply(`${user.tag} has been kicked.`);
  }
};
