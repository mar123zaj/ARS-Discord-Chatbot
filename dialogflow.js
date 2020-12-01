const dialogflow = require("dialogflow").v2beta1;
const { struct } = require("pb-util");



module.exports.getResponse = async (opts) => {
    const { text, event, channelID, authorID, nickname } = opts;
    
    

    const credentials = require("./credentials/dialogflow.json");
    const session = new dialogflow.SessionsClient({ credentials });
    const contextsClient = new dialogflow.ContextsClient({ credentials });
    
    const sessionId = `${channelID}${authorID}`;
    const contextPath = contextsClient.contextPath(credentials.project_id, sessionId, "fasade");
    const sessionPath = session.sessionPath(credentials.project_id, sessionId);

    const params = { nickname };
    await contextsClient.createContext({
        parent: sessionPath,
        context: {
            name: contextPath,
            parameters: struct.encode(params),
            lifespanCount: 5
        }
    });
    const request = prepareRequest({ text, event, languageCode: "pl", session: sessionPath })
    const [ response ] = await session.detectIntent(request);
    return response.queryResult.fulfillmentText;
}

function prepareRequest({ text, event, languageCode, session }) {
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