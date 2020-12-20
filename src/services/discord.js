module.exports.reactionsProcessor = ({ message, client }) => {
    const { content } = message;
    const reactions = require("../resources/reactions");
    for (const reaction of reactions) {
        const { keyWords1, keyWords2 } = reaction;
        if (new RegExp(keyWords1.join("|")).test(content.toLowerCase()) && new RegExp(keyWords2.join("|")).test(content.toLowerCase())) {
            sendReaction({ reaction, message, client })
        }
    }

};

module.exports.sendReaction = sendReaction;

function sendReaction({ reaction, message, client }) {
    const { type, emojiName, meme } = reaction;
    switch (type) {
        case "meme":
            message.channel.send(meme);
            break;
        case "emoji":
            const emoji = getEmojiByName({ name: emojiName, client });
            message.react(emoji);
            break;
    }
};

module.exports.getEmojiByName = getEmojiByName;

module.exports.replaceMentionsFromText = (content) => content.replace(/<@(.*?)> /g, "");;

module.exports.getUserNickname = (message, client) => {
    const serverId = message.guild.id;
    const guild = client.guilds.cache.get(serverId);
    const member = guild.member(message.author);
    return member ? member.displayName : "user";
};

function getEmojiByName({ name, client }) {
    return client.emojis.cache.find(emoji => emoji.name === name);
};

async function sendMessage({ message, text, channelName }) {
    if(channelName) {
        const channel = message.client.channels.cache.find(channel => channel.name === channelName);
        return await channel.send(text)
    } else {
        return await message.channel.send(text)
    }
};

module.exports.sendResponse = async ({ message, text, channelName, emojis }) => {
    const botMessage = await sendMessage({ message, text, channelName });
    if (emojis && emojis.length) emojis.forEach(emoji => botMessage.react(emoji))
};

module.exports.isAdmin = (member) => member.roles.cache.some(role => role.name === "Admin");

module.exports.isBotMentioned = (mentions, id) => mentions.has(id);