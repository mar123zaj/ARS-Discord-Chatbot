module.exports.getEmoji = (emojiName, client) => {
    return client.emojis.cache.find(emoji => emoji.name === emojiName);
};

module.exports.replaceMentionsFromText = (content) => {
    return content.replace(/<@(.*?)> /g, "");
};

module.exports.getUserNickname = (message, client) => {
    const serverId = message.guild.id;
    const guild = client.guilds.cache.get(serverId);
    const member = guild.member(message.author);
    return member ? member.displayName : "user";
};
