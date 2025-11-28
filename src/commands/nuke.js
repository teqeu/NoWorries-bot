import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('nuke')
        .setDescription('Completely wipes this channel by deleting and recreating it')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
        const channel = interaction.channel;

        await interaction.reply({
            content: 'Channel is being wiped...',
            ephemeral: true
        });

        const newChannel = await channel.clone();
        await channel.delete();

        await newChannel.send('Channel has been wiped and recreated.');
    }
};
