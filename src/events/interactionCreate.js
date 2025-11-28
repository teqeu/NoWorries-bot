import { EmbedBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

export default {
  name: 'interactionCreate',
  async execute(interaction, client) {

    // --- Slash commands ---
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (err) {
        console.error(err);
        if (!interaction.replied) {
          await interaction.reply({ content: '❌ There was an error executing this command.', ephemeral: true });
        }
      }
      return;
    }

    // --- Modal submissions ---

    // DM Role Modal
    if (interaction.isModalSubmit() && interaction.customId.startsWith('dmrole_modal_')) {
      const roleId = interaction.customId.replace('dmrole_modal_', '');
      const role = interaction.guild.roles.cache.get(roleId);
      if (!role) return interaction.reply({ content: '❌ Role not found.', ephemeral: true });

      const messageText = interaction.fields.getTextInputValue('message');

      await interaction.deferReply({ ephemeral: true });
      await interaction.guild.members.fetch();
      const members = role.members;

      let success = 0;
      let failed = 0;

      for (const [id, member] of members) {
        try {
          const embed = new EmbedBuilder()
            .setTitle('Message from Server')
            .setDescription(messageText)
            .setColor('Blue')
            .setFooter({ text: `Sent from ${interaction.guild.name}` });

          await member.send({ embeds: [embed] });
          success++;
        } catch {
          failed++;
        }
        await new Promise(r => setTimeout(r, 250)); // rate-limit
      }

      await interaction.editReply({
        content: `✅ DM sent to **${success}** members.\n❌ Failed: **${failed}**.`
      });
      return;
    }

    // Custom Embed Modal
    if (interaction.isModalSubmit() && interaction.customId === 'custom_embed_modal') {
      await interaction.deferReply({ ephemeral: true });

      const title = interaction.fields.getTextInputValue('embed_title') || '';
      const description = interaction.fields.getTextInputValue('embed_description');
      const color = interaction.fields.getTextInputValue('embed_color') || '#0099ff';

      const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(color)
        .setTimestamp();

      // Default to the channel the command was used in
      const channel = interaction.channel;

      try {
        await channel.send({ embeds: [embed] });
        await interaction.editReply({ content: '✅ Embed sent successfully!' });
      } catch (err) {
        console.error(err);
        await interaction.editReply({ content: '❌ Failed to send embed.' });
      }
      return;
    }
  }
};
