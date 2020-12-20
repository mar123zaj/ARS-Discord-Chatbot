const DiscordApp = require('discord.js');
const { eventMessageProcessor } = require("./src/processors");

const client = new DiscordApp.Client();

client.login(process.env.DISCORD_TOKEN);

client.on('ready', () => console.log(`Logged in as ${client.user.tag}!`));

client.on('message', async message => await eventMessageProcessor(message, client));