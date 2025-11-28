import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('roleall')
    .setDescription('Give a role to everyone in the server')
    .addRoleOption(option =>
      option
        .setName('role')
        .setDescription('The role to assign')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction) {
    const role = interaction.options.getRole('role');
    const guild = interaction.guild;

    if (!guild.members.me.permissions.has(PermissionFlagsBits.ManageRoles)) {
      return interaction.reply({
        content: "I don't have permission to manage roles!",
        ephemeral: true
      });
    }

    if (role.position >= guild.members.me.roles.highest.position) {
      return interaction.reply({
        content: "I cannot assign a role higher or equal to my highest role!",
        ephemeral: true
      });
    }

    await interaction.reply({
      content: `Starting to give **${role.name}** to everyone... This may take a while.`,
      ephemeral: true
    });

    const members = await guild.members.fetch(); 
    let count = 0;

    for (const [, member] of members) {
      try {
        if (!member.roles.cache.has(role.id) && !member.user.bot) {
          await member.roles.add(role);
          count++;
        }
      } catch (err) {
        console.error(`Failed to add role to ${member.user.tag}:`, err);
      }
    }

    interaction.followUp({
      content: `Finished! Added **${role.name}** to ${count} members.`,
      ephemeral: true
    });
  }
};
