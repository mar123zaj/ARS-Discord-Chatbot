const BANNED_COMMANDS = require("./bannedCommands");

module.exports = (commandName) => BANNED_COMMANDS.includes(commandName);