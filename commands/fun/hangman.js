const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("hangman").setDescription("Starts a hangman minigame!"),
    async execute(interaction) {
        await interaction.client.wekyManager.createHangman({
            context: interaction,
            category: "Technology",
        });
    },
};