require("dotenv").config();

const fs = require("node:fs");
const path = require("node:path");
const { WekyManager } = require("@m3rcena/weky");
const { Client, Collection, Events, GatewayIntentBits, MessageFlags, REST, Routes } = require('discord.js');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageTyping
    ],
 });

client.once(Events.ClientReady, (readyClient) => {
    console.log(`Logged in as ${readyClient.user.tag}!`);
    client.wekyManager = new WekyManager(readyClient);
});

client.commands = new Collection();

const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
            client.commands.set(command.data.name, command);
        } else {
            console.log(`The command at ${filePath} needs something, idk what it needs but yea`);
        }
    }
}

const rest = new REST().setToken(process.env.TOKEN);

(async () => {
    try {
        console.log(`${commands.length} refreshing`);

        const data = await rest.put(Routes.applicationCommands(process.env.CLIENTID), { body: commands });
        console.log(`reloaded ${data.length} commands`);
    } catch (error) {
        console.error(error);
    }
})();

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.log(`${interaction.commandName} wasn't found.`)
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.log(error);
        await interaction.reply({
            content: 'There was an error while executing the message, please check the logs!',
            flags: MessageFlags.Ephemeral,
        });
    }
});

client.login(process.env.TOKEN);