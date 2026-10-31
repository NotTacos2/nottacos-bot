const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("snake").setDescription("Starts a snake minigame!"),
    async execute(interaction) {
        await interaction.client.wekyManager.createSnake({
            context: interaction,
            gridSize: 12,
            embed: { title: "Snake", color: "Green" },
        });
    },
};