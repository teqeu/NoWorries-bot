import {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder
} from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('dmrole')
    .setDescription('Send a DM to all members with a specific role.')
    .addRoleOption(option =>
      option
        .setName('role')
        .setDescription('Role to DM')
        .setRequired(true)
    ),

  async execute(interaction) {
    const role = interaction.options.getRole('role');

    const modal = new ModalBuilder()
      .setCustomId(`dmrole_modal_${role.id}`)
      .setTitle('Send DM to Role');

    const messageInput = new TextInputBuilder()
      .setCustomId('message')
      .setLabel('Message to send')
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const row = new ActionRowBuilder().addComponents(messageInput);
    modal.addComponents(row);

    await interaction.showModal(modal);
  }
};
