const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("fasttype").setDescription("Starts a fast type minigame!"),
    async execute(interaction) {
        await interaction.client.wekyManager.createFastType({
            context: interaction,
            difficulty: "medium",
        });
    },
};