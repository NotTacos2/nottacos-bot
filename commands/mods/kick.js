const { InteractionContextType, PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Select a member and kick them from the server.")
        .addUserOption((option) => option.setName('target').setDescription('Member to kick').setRequired(true))
        .addStringOption((option) => option.setName('reason').setDescription('Why do you want to kick this member?'))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setContexts(InteractionContextType.Guild),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') ?? 'No reason provided';

        if (!target) {
            return interaction.reply("Can't find that member, make sure it's not a bot!");
        }
        
    try {
        await interaction.guild.members.kick(target, { reason });
        await interaction.reply(`Kicking ${target.username} for reason, ${reason}`);
    } catch (error) {
        await interaction.reply("Can't kick for some reason... Make sure the bot has permissions in the server!");
        console.log(error.message);
    }
    }
};