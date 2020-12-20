const { isBotMentioned, reactionsProcessor } = require("./services/discord");
const { processor: dialogflowProcessor } = require("./services/dialogflow");
const commandProcessor = require("./command/processor");
const { isCommand } = require("./utils");


module.exports.eventMessageProcessor = async (message, client) => {
    const { mentions, content } = message;
    const { user: { id: botId } } = client;
    console.log(`Message: ${content}.`);
    if (isBotMentioned(mentions, botId))
        await dialogflowProcessor({ message, client });
    else if (isCommand(content))
        await commandProcessor({ message, client });
    else
        await reactionsProcessor({ message, client });
    
}