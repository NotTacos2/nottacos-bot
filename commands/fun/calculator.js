const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("calculator").setDescription("Starts a scientific calculator!"),
    async execute(interaction) {
        await interaction.client.wekyManager.createCalculator({
            context: interaction,
            embed: { title: "Scientific Calculator", color: "Blurple" },
        });
    },
};