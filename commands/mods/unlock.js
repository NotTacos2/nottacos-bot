const { InteractionContextType, PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unlock")
        .setDescription("Unlocks the current channel if it has been locked.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .setContexts(InteractionContextType.Guild),
    async execute(interaction) {
    try {
        await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: true });
        await interaction.reply(`Channel successfully unlocked`);
    } catch (error) {
        await interaction.reply("Can't unlock channel for some reason... Make sure the bot has permissions in the server or the channel has already been unlocked!");
        console.log(error.message);
    }
    }
};