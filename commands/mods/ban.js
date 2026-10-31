const { InteractionContextType, PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Select a member and ban them from the server.")
        .addUserOption((option) => option.setName('target').setDescription('Member to ban').setRequired(true))
        .addStringOption((option) => option.setName('reason').setDescription('Why do you want to ban this member?'))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setContexts(InteractionContextType.Guild),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') ?? 'No reason provided';

        if (!target) {
            return interaction.reply("Can't find that member, make sure it's not a bot!");
        }

    try {
        await interaction.guild.members.ban(target, { reason });
        await interaction.reply(`Banning ${target.username} for reason, ${reason}`);
    } catch (error) {
        await interaction.reply("Can't ban for some reason... Make sure the bot has permissions in the server!");
        console.log(error.message);
    }
    }
};