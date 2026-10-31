const { InteractionContextType, PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lock")
        .setDescription("Locks the current channel.")
        .addStringOption((option) => option.setName('reason').setDescription('Why do you want to lock this channel?'))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .setContexts(InteractionContextType.Guild),
    async execute(interaction) {
        const reason = interaction.options.getString('reason') ?? 'No reason provided';
    try {
        await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: false });
        await interaction.reply(`Channel successfully locked because of ${reason}`);
    } catch (error) {
        await interaction.reply("Can't lock channel for some reason... Make sure the bot has permissions in the server or the channel has already been locked!");
        console.log(error.message);
    }
    }
};