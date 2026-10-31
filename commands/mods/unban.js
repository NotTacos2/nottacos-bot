const { InteractionContextType, PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Unbans a member using their user id.")
        .addStringOption((option) => option.setName('targetid').setDescription('user id to unban').setRequired(true))
        .addStringOption((option) => option.setName('reason').setDescription('Why do you want to unban this member?'))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setContexts(InteractionContextType.Guild),
    async execute(interaction) {
        const target = interaction.options.getString('targetid');
        const reason = interaction.options.getString('reason') ?? 'No reason provided';

    try {
        await interaction.guild.members.unban(target);
        await interaction.reply(`Unbanning user with id ${target} for reason, ${reason}`);
    } catch (error) {
        await interaction.reply("Can't unban for some reason... Make sure the bot has permissions in the server!");
        console.log(error.message);
    }
    }
};