const { InteractionContextType, PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("timeout")
        .setDescription("Select a member and timeout them from the server.")
        .addUserOption((option) => option.setName('target').setDescription('Member to timeout').setRequired(true))
        .addIntegerOption((option) => option.setName('time').setDescription('Time for timeout in minutes').setRequired(true))
        .addStringOption((option) => option.setName('reason').setDescription('Why do you want to timeout this member?'))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .setContexts(InteractionContextType.Guild),
    async execute(interaction) {
        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason') ?? 'No reason provided';
        const time = interaction.options.getInteger('time');

        if (!target) {
            return interaction.reply("Can't find that member, make sure it's not a bot!");
        }

    try {
        await target.timeout(time * 60 * 1000, { reason });
        await interaction.reply(`Timing out ${target.username} for time of ${time} because ${reason}`);
    } catch (error) {
        await interaction.reply("Can't timeout for some reason... Make sure the bot has permissions in the server!");
        console.log(error.message);
    }
    }
};