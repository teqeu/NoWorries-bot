import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  time
} from "discord.js";
import { sendLog } from "../utils/guildConfig.js";

export default {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeout a user")
    .addUserOption(opt =>
      opt.setName("user")
        .setDescription("User to timeout")
        .setRequired(true)
    )
    .addIntegerOption(opt =>
      opt.setName("minutes")
        .setDescription("Duration of timeout in minutes")
        .setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName("reason")
        .setDescription("Reason for timeout")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const member = await interaction.guild.members.fetch(user.id);
    const minutes = interaction.options.getInteger("minutes");
    const reason = interaction.options.getString("reason") || "No reason provided";

    const durationMs = minutes * 60 * 1000;

    await member.timeout(durationMs, reason);

    const embed = new EmbedBuilder()
      .setTitle("User Timed Out")
      .setColor("Blue")
      .addFields(
        { name: "User", value: `${user.tag} (${user.id})` },
        { name: "Duration", value: `${minutes} minutes` },
        { name: "Moderator", value: interaction.user.tag },
        { name: "Reason", value: reason }
      )
      .setTimestamp();

    await sendLog(interaction.guild, { embeds: [embed] });

    await interaction.reply(`${user.tag} has been timed out for ${minutes} minutes.`);
  }
};
