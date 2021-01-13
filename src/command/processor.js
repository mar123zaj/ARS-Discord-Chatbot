const { readdirSync } = require('fs')
const path = require("path");
const discord = require("../services/discord");
const isBannedCommand = require("./commands/banned/isBannedCommand");

const generalCommands = (() => {
    const commandsPath = "/commands/general/"
    const files = readdirSync(path.join(__dirname, commandsPath));
    return files.map(fileName => fileName.replace(".js", "")).filter(fileName => fileName !== "resources")
})();

const adminCommands = (() => {
    const commandsPath = "/commands/admin/"
    const files = readdirSync(path.join(__dirname, commandsPath));
    return files.map(fileName => fileName.replace(".js", ""));
})();

const commandExists = (commandName) => generalCommands.includes(commandName) || adminCommands.includes(commandName);

const isAdminCommand = (commandName) => adminCommands.includes(commandName);

module.exports = ({ message, client }) => {
    const { content, member } = message;
    const [command, ...arguments] = content.substring(1).split(" ");
    const commandName = command.toLowerCase();
    
    if(isBannedCommand(commandName))
        return;
    const isAdmin = discord.isAdmin(member);
    if (commandExists(commandName)) {
        if (isAdminCommand(commandName) && isAdmin) {
            const command = require(`./commands/admin/${commandName}`);
            return command.execute({ arguments, message, client });
        } else if (isAdminCommand(commandName) && !isAdmin) {
            return discord.sendResponse({ text: "Nie jesteś upoważniony, by używać tej komendy.", message })
        } else {
            const command = require(`./commands/general/${commandName}`);
            command.execute({ arguments, message, client });
        }
    } else {
        const generalCommandsString = generalCommands.join(", ");
        let text = `Niestety nie mam takiej komendy, spróbuj jednej z tych:\n${generalCommandsString}`;
        if (isAdmin) {
            const adminCommandsString = adminCommands.join(", ");
            text += `\nLub tych przeznaczonych dla Adminów:\n${adminCommandsString}`;
        };
        discord.sendResponse({ message, text })
    }
}