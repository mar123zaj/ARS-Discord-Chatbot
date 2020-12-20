const { getEmojiByName } = require("../../../services/discord");
const { getRaceDrivers } = require("../../../services/apexseries");
const { EMOJI_PLUS_ONE, EMOJI_MINUS_ONE } = require("../../../resources/emojis");

module.exports.execute = async ({ arguments, message, client }) => {
    const { channel } = message;
    const [ raceNumber ] = arguments;
    const drivers = await getRaceDrivers(raceNumber);
    const plusOneEmoji = getEmojiByName({ name: EMOJI_PLUS_ONE, client });
    const minusOneEmoji = getEmojiByName({ name: EMOJI_MINUS_ONE, client });
    const response = `\nDaj ${plusOneEmoji} by zagłosować na kierowcę wyścigu lub ${minusOneEmoji} by zagłosować na ogura wyścigu.`;
    await channel.send(response);
    for (const driver of drivers) {
        const { driver: { Name } } = driver;
        const botMessage = await channel.send(`**${Name}**`);
        botMessage.react(plusOneEmoji);
        botMessage.react(minusOneEmoji);
    }
}