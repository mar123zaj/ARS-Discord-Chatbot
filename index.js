const dialogflow = require("./dialogflow");
const utils = require("./utils");
const DiscordApp = require('discord.js');
const client = new DiscordApp.Client();

const { token } = require("./credentials/discord");

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
    console.log(JSON.stringify(message, null, 4))
    if (message.mentions.has(client.user.id)) {
        const chatbotParameters = utils.prepareParameters({ message, client });
        const chatbotResponse = await dialogflow.getResponse(chatbotParameters);
        const chatbotMessage = await message.channel.send(chatbotResponse);
        chatbotMessage.react("👍");
    };

});


client.on("messageUpdate", async (oldMessage, newMessage) => {
    const chatbotResponse = await dialogflow.getResponse({
        ...newMessage,
        event: "modified_message"
    });
    newMessage.channel.send(chatbotResponse);

});

client.login(token);