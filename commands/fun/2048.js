const { SlashCommandBuilder } = require("discord.js");
const twentyfourtyeightgame = require('@m3rcena/weky');

module.exports = {
    data: new SlashCommandBuilder().setName("2048").setDescription("Starts a 2048 minigame!"),
    async execute(interaction) {
        await interaction.client.wekyManager.create2048({
            context: interaction,
            embed: { title: "2048", color: "Blurple" },
            time: 120_000,
        });
    },
};