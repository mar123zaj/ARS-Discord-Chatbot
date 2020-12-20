const dialogflow = require("dialogflow").v2beta1;
const { struct } = require("pb-util");
const discord = require("../services/discord")

module.exports.processor = async ({ message, client }) => {
    const { text, emojis } = await getResponse({ message, client });
    await discord.sendResponse({ message, text, emojis });
}

async function getResponse({ message, event, client }) {
    const { text, username } = createParameterstObject({ message, client });
    const params = { username };
    

    const credentials = require("../../credentials/dialogflow");
    const session = new dialogflow.SessionsClient({ credentials });
    const contextsClient = new dialogflow.ContextsClient({ credentials });
    
    const sessionId = username;
    const contextPath = contextsClient.contextPath(credentials.project_id, sessionId, "fasade");
    const sessionPath = session.sessionPath(credentials.project_id, sessionId);

    
    await contextsClient.createContext({
        parent: sessionPath,
        context: {
            name: contextPath,
            parameters: struct.encode(params),
            lifespanCount: 5
        }
    });
    const request = createRequest({ text, event, languageCode: "pl", session: sessionPath })
    const [ response ] = await session.detectIntent(request);
    const usefulParameters = extractParametersFromResponse(response);
    return usefulParameters;
}

function createRequest({ text, event, languageCode, session }) {
    return text
        ? {
            session,
            queryInput: {
                text: {
                    text,
                    languageCode
                }
            }
        }
        : {
            session,
            queryInput: {
                event: {
                    name: event,
                    languageCode
                }
            }
        }
}

function extractParametersFromResponse(response) {
    const [ text, emojisStringList ] = response.queryResult.fulfillmentText.split("@defaultEmojis");
    const parameters = { text }
    if (emojisStringList) {
        const [ _, allEmojisString ] = emojisStringList.match(/\[(.*?)\]/);
        const emojis = allEmojisString.split(",");
        parameters.emojis = emojis;
    }
    return parameters;
}

function createParameterstObject({ message, client }) {
    const { content } = message;
    const username = discord.getUserNickname(message, client);
    const text = discord.replaceMentionsFromText(content);
    return {
        ...message,
        username,
        text
    }
}