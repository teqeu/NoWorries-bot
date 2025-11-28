import {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ChannelType
} from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('sendembed')
    .setDescription('Create and send a custom embed.')
    .addChannelOption(option =>
      option
        .setName('channel')
        .setDescription('Channel to send the embed in')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),

  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId('custom_embed_modal')
      .setTitle('Create Custom Embed');

    const titleInput = new TextInputBuilder()
      .setCustomId('embed_title')
      .setLabel('Embed Title')
      .setStyle(TextInputStyle.Short)
      .setRequired(false);

    const descInput = new TextInputBuilder()
      .setCustomId('embed_description')
      .setLabel('Embed Description')
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const colorInput = new TextInputBuilder()
      .setCustomId('embed_color')
      .setLabel('Embed Color (Hex, e.g., #FF0000)')
      .setStyle(TextInputStyle.Short)
      .setRequired(false);

    const row1 = new ActionRowBuilder().addComponents(titleInput);
    const row2 = new ActionRowBuilder().addComponents(descInput);
    const row3 = new ActionRowBuilder().addComponents(colorInput);

    modal.addComponents(row1, row2, row3);

    await interaction.showModal(modal);
  }
};
