const responses = require("./resources/responses");

module.exports.execute = async ({ arguments, message, client }) => message.channel.send(responses.KIEDYLIGAA);
