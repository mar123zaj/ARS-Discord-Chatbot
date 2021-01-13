const imagesUrls = require("./resources/links");

module.exports.execute = async ({ arguments, message, client }) => message.channel.send(imagesUrls.ZLOTONOSY);
