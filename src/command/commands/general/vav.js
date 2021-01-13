const links = require("./resources/links");

module.exports.execute = async ({ arguments, message, client }) => message.channel.send(links.VAV);
