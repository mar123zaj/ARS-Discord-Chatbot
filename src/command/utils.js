const { ADMIN_COMMANDS } = require("./config");

module.exports.isAdminCommand = commandName => ADMIN_COMMANDS.includes(commandName);