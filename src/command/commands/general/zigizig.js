const { sendReaction } = require("../../../services/discord");

module.exports.execute = async ({ arguments, message, client }) => {
    const reactions = require("../../../resources/reactions");
    const reaction = reactions.find(r => r.name === "ZIGIZONG");
    sendReaction({ reaction, message, client })
}