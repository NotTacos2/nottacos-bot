const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("guessthepokemon").setDescription("Starts a who's that pokemon minigame!"),
    async execute(interaction) {
        await interaction.client.wekyManager.createGuessThePokemon({
            context: interaction,
            embed: { title: "Who's That Pokemon?" },
            time: 60_000,
        });
    },
};