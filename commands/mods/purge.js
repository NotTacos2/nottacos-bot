const { InteractionContextType, PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("purge")
        .setDescription("Purge messages from the server.")
        .addIntegerOption((option) => option.setName('amount').setDescription('How many messages would you like to purge?').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .setContexts(InteractionContextType.Guild),
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');

        if (isNaN(amount) || amount < 1) {
            await interaction.reply("That amount is either not valid or less than 1!");
            return;
        }

    try {
        await interaction.channel.bulkDelete(amount, true);
        await interaction.reply(`Successfully deleted ${amount} messages!`);
    } catch (error) {
        await interaction.reply("Can't delete messages for some reason... Make sure the bot has permissions in the server!");
        console.log(error.message);
    }
    }
};