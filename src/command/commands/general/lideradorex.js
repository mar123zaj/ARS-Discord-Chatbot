const imagesUrls = require("./resources/imagesUrls");

module.exports.execute = async ({ arguments, message, client }) => message.channel.send(imagesUrls.LIDERADOREX);
