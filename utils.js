const discord = require("./discord");

module.exports.prepareParameters = (opts) => {
    const { message, client } = opts;
    const { content } = message;
    const nickname = discord.getUserNickname(message, client);
    const text = discord.replaceMentionsFromText(content);
    return {
        ...message,
        nickname,
        text
    }
}