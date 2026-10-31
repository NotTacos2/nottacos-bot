const { InteractionContextType, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("turnbased").setDescription("1v1 in turn based rpg with a user in the server!").addUserOption((option) => option.setName('target').setDescription('Member to 1v1').setRequired(true))
            .setContexts(InteractionContextType.Guild),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        await interaction.client.wekyManager.createFight({
            context: interaction,
            opponent: target,
            embed: { title: "Battle Arena" },
        });
    },
};