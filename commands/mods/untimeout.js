const { InteractionContextType, PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("untimeout")
        .setDescription("Select a member and remove their timeout from the server.")
        .addUserOption((option) => option.setName('untarget').setDescription('Member to remove timeout').setRequired(true))
        .addStringOption((option) => option.setName('reason').setDescription('Why do you want to un time out this member?'))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .setContexts(InteractionContextType.Guild),
    async execute(interaction) {
        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason') ?? 'No reason provided';

        if (!target) {
            return interaction.reply("Can't find that member, make sure it's not a bot!");
        }

    try {
        await target.timeout(0, { reason });
        await interaction.reply(`Removed time out ${target.username} because ${reason}`);
    } catch (error) {
        await interaction.reply("Can't remove timeout for some reason... Make sure the bot has permissions in the server!");
        console.log(error.message);
    }
    }
};